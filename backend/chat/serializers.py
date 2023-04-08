from rest_framework import serializers
from chat.models import Message
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username")

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "sender",
            "receiver",
            "message",
            "createdAt",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_receiver(self, obj):
        return UserSerializer(obj.receiver).data