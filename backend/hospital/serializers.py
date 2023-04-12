from rest_framework import serializers
from user.models import InPatient

class AdmitInPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = InPatient
        fields = ("patient","ward")