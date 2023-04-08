from rest_framework import serializers
from location.models import SubCounty

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCounty
        fields = "__all__"
        depth = 1