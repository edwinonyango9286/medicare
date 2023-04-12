from rest_framework import serializers
from user.models import User, HospitalStaff, InPatient, InPatientReport, OutPatient, OutPatientReport


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "phoneNumber", "dateOfBirth", "gender", "location", "nationalId", "password"]


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "phoneNumber", "dateOfBirth", "gender", "location", "nationalId", "image"]
        depth = 2


class HospitalStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalStaff
        fields = "__all__"
        depth = 4
