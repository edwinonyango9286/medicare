from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from chat.models import Conversation,Message
from uuid import UUID
from chat.serializers import MessageSerializer
from django.contrib.auth import get_user_model
import json

User = get_user_model()

class NotificationConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)

class ChatConsumer(JsonWebsocketConsumer):
    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)
    
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None
        
    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)

        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name,
            self.channel_name,
        )
        self.send_json(
            {
                "type": "online_user_list",
                "users": [user.email for user in self.conversation.online.all()],
            }
        )
        async_to_sync(self.channel_layer.group_send)(
            self.conversation_name,
            {
                "type": "user_join",
                "user": self.user.email,
            },
        )

        self.conversation.online.add(self.user)
        
        messages = Message.objects.filter(conversation__id=self.conversation.id).order_by("-createdAt")[0:50]
        message_count = Message.objects.filter(conversation__id=self.conversation.id).count()
        self.send_json(
            {
                "type": "last_50_messages",
                "messages": MessageSerializer(messages, many=True).data,
                "has_more": message_count > 50,
            }
        )
        
    def disconnect(self, code):
        if self.user.is_authenticated:
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                "type": "user_leave",
                "user": self.user.email,
                },
            )
            self.conversation.online.remove(self.user)
        return super().disconnect(code)
    
    def user_join(self, event):
        self.send_json(event)

    def user_leave(self, event):
        self.send_json(event)
    
    def get_receiver(self):
        userIds = self.conversation_name.split("__")
        for id in userIds:
            if UUID(id) != self.user.id:
                return User.objects.get(id=UUID(id))

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
                sender=self.user,
                receiver=self.get_receiver(),
                message=content["message"],
                conversation=self.conversation
            )
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "chat_message_echo",
                    "name": self.user.id.hex,
                    "message": MessageSerializer(message).data,
                },
            )
        
        if message_type == "typing":
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "typing",
                    "user": self.user.email,
                    "typing": content["typing"],
                },
            )
            
        return super().receive_json(content, **kwargs)
    
    def typing(self, event):
        self.send_json(event)

    def chat_message_echo(self, event):
        self.send_json(event)