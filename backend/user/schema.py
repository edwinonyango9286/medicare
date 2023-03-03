from graphene_django import DjangoObjectType
from user.models import Proffesion,HospitalStaff,Appointment,Diagnosis,Prescription,InPatient,OutPatient,OutPatientReport
from django.contrib.auth import get_user_model
import graphene

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id","username","email", "phoneNumber","dateOfBirth","gender","image","location","nationalId","is_staff","is_superuser","image_url")
        
    image_url = graphene.String()
    
    @staticmethod
    def resolve_image_url(root, info, **kwargs):
        return root.image.url

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
        fields = ("doctor","patient","appointment","diagnosis","createdAt")

class PrescriptionType(DjangoObjectType):
    class Meta:
        model = Prescription
        fields = ("diagnosis","prescription","createdAt")

class InPatientType(DjangoObjectType):
    class Meta:
        model = InPatient
        fields = ("patient","ward","createdAt")

class OutPatientType(DjangoObjectType):
    class Meta:
        model = OutPatient
        fields = ("patient","createdAt")

class OutPatientReportType(DjangoObjectType):
    class Meta:
        model = OutPatientReport
        fields = ("patient","report","createdAt")