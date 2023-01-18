from graphene_django import DjangoObjectType
from user.models import Proffesion,HospitalStaff,Appointment,Diagnosis,Prescription,InPatient,OutPatient,OutPatientReport
from django.contrib.auth import get_user_model

MedicareUser = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = MedicareUser
        fields = ("id","firstName","lastName","email", "phoneNumber","dateOfBirth","gender","image","location","nationalId","is_staff","is_superuser")

class ProffesionType(DjangoObjectType):
    class Meta:
        model = Proffesion
        fields = ("id","type","description")

class HospitalStaffType(DjangoObjectType):
    class Meta:
        model = HospitalStaff
        fields = ("hospital","staff","proffesion")

class AppointmentType(DjangoObjectType):
    class Meta:
        model = Appointment
        fields = ("patient", "doctor","hospital","createdAt","isActive")

class DiagnosisType(DjangoObjectType):
    class Meta:
        model = Diagnosis
        fields = ("doctor","patient","appointment","hospital","diagnosis","createdAt")

class PrescriptionType(DjangoObjectType):
    class Meta:
        model = Prescription
        fields = ("diagnosis","prescription","createdAt")

class InPatientType(DjangoObjectType):
    class Meta:
        model = InPatient
        fields = ("patient","ward","admittedAt")

class OutPatientType(DjangoObjectType):
    class Meta:
        model = OutPatient
        fields = ("patient","admittedAt")

class OutPatientReportType(DjangoObjectType):
    class Meta:
        model = OutPatientReport
        fields = ("patient","report","recordedAt")