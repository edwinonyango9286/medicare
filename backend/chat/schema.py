from graphene_django import DjangoObjectType
from chat.models import Conversation, Message
import graphene
from user.models import User
from user.schema import UserType
from django.db.models import Q
from uuid import UUID
        
class MessageType(DjangoObjectType):
    class Meta:
        model = Message
        fields = ("id","sender","receiver","message","createdAt","read")

class ConversationType(DjangoObjectType):
    class Meta:
        model = Conversation
        filelds = ("id","name","last_message")
        
    last_message = graphene.Field(MessageType)
    other_user = graphene.Field(UserType)
    
    @staticmethod
    def resolve_last_message(root, info, **kwargs):
        allMessages = list(Message.objects.filter(Q(receiver__id=info.context.user.id) | Q(sender__id=info.context.user.id),conversation__id=root.id).order_by("-createdAt"))
        if allMessages:
            return allMessages[0]
        
        else:
            return None
    
    def resolve_other_user(root, info, **kwargs):
        print(root)
        userids = root.name.split("__")
        for user in userids:
            if UUID(user) != info.context.user.id:
                return User.objects.get(id=UUID(user))
    
        
class ChatQuery(graphene.ObjectType):
    conversations = graphene.List(ConversationType)
    conversationByName = graphene.Field(ConversationType, conversation_name=graphene.String())
    messages = graphene.List(MessageType, conversation_name=graphene.String())
    
    def resolve_messages(root, info, conversation_name):
        return Message.objects.filter(conversation__name=conversation_name)
    
    def resolve_conversations(root, info):
        return Conversation.objects.filter(name__contains=str(info.context.user.id))
    
    def resolve_conversationByName(root, info, conversation_name):
        return Conversation.objects.get(name=conversation_name)
    