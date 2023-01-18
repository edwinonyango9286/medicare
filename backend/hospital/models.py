from django.db import models
from location.models import SubCounty
from django.contrib import admin

class Hospital(models.Model):
    location = models.ForeignKey(SubCounty,on_delete=models.CASCADE)
    name = models.CharField(max_length=20,unique=True)

    def __str__(self):
        return self.name

class Ward(models.Model):
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    name = models.CharField(max_length=10,unique=True)
    capacity = models.IntegerField()
    occupancy = models.IntegerField(default=0)
    isFull = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.hospital} -> {self.name}"