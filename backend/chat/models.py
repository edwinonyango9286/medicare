from django.db import models
from django.contrib.auth import get_user_model
from django.contrib import admin

User = get_user_model()

class Conversation(models.Model):
    name = models.CharField(max_length=128)
    online = models.ManyToManyField(to=User, blank=True)
    
    def get_online_count(self):
        return self.online.count()
    
    def join(self, user):
        self.online.add(user)
        self.save()
        
    def leave(self, user):
        self.online.remove(user)
        self.save()
        
    def __str__(self):
        return f"{self.name} ({self.get_online_count()})"
    
admin.site.register(Conversation)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.ForeignKey(User,related_name="sender",on_delete=models.CASCADE)
    receiver = models.ForeignKey(User,related_name="receiver",on_delete=models.CASCADE)
    message = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"From {self.sender.email} to {self.receiver.email}: {self.message} [{self.createdAt}]"
    
admin.site.register(Message)