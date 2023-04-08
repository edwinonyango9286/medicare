from django.db import models
from uuid import uuid4

class Ward(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    type = models.CharField(max_length=20,default="NORMAL")
    name = models.CharField(max_length=10,unique=True)
    capacity = models.IntegerField()
    occupancy = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name}"