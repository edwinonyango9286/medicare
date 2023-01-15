import graphene
from graphene_django import DjangoObjectType
from user.models import Proffesion, HospitalStaff, Appointment, PatientRecord, Prescription, InPatient, OutPatient, OutPatientReport
from user.schema import UserType,ProffesionType, HospitalStaffType, AppointmentType, PatientRecordType, PrescriptionType, InPatientType, OutPatientType, OutPatientReportType
from django.contrib.auth import get_user_model

MedicareUser = get_user_model()

class UserQuery(graphene.ObjectType):
    user_data = graphene.Field(UserType)
    proffesions = graphene.List(ProffesionType)
    allHospitalStaff = graphene.List(HospitalStaffType, hospitalId = graphene.String())
    groupHospitalStaff = graphene.List(HospitalStaffType, hospitalId = graphene.String(), proffesionId=graphene.String())
    hospitalStaff = graphene.Field(HospitalStaffType, hospitalId = graphene.String(), staffId = graphene.String())
    hospitalAppointments = graphene.List(AppointmentType, hospitalId = graphene.String())
    doctorAppointments = graphene.List(AppointmentType, hospitalId = graphene.String(), staffId = graphene.String())
    inPatient = graphene.Field(InPatientType, hospitalId=graphene.String(), patientId=graphene.String()) 
    inPatients = graphene.List(InPatientType, hospitalId=graphene.String())
    wardInPatients = graphene.List(InPatientType, wardId=graphene.String())

    def resolve_inPatient(root, info, hospitalId, patientId):
        user = info.context.user
        if user.is_authenticated:
            if (patientId == user.id) or user.is_staff:
                return InPatient.objects.get(ward__hospital=hospitalId,patient__id=patientId,isActive=True)
            
            else:
                return {}
        
        else:
            return {}

    def resolve_inPatients(root, info, hospitalId):
        user = info.context.user
        if user.is_authenticated and user.is_staff:
            return InPatient.objects.filter(ward__hospital=hospitalId)

        else:
            return []

    def resolve_wardInPatients(root, info, wardId):
        user = info.context.user
        if user.is_authenticated and user.is_staff:
            return InPatient.objects.filter(id=wardId)

        else:
            return []

    def resolve_user_data(root,info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        else:
            return user

    def resolve_proffesions(root, info):
        return Proffesion.objects.all()

    def resolve_allHospitalStaff(root, info, hospitalId):
        user = info.context.user
        if user.is_authenticated:
            return HospitalStaff.objects.filter(hospital__id=hospitalId)
        else:
            return HospitalStaff.objects.filter(hospital__id=hospitalId)

    def resolve_hospitalStaff(root, info, hospitalId, staffId):
        user = info.context.user
        if user.is_authenticated:
            return HospitalStaff.objects.filter(hospital__id=hospitalId, staff__id=staffId)
        
        else:
            return []

    def resolve_hospitalAppointments(root, info, hospitalId):
        user = info.context.user
        if user.is_authenticated:
            return Appointment.objects.filter(hospital__id=hospitalId)

    def resolve_doctorAppointments(root, info, hospitalId):
        user = info.context.user
        if user.is_authenticated and user.is_staff:
            return Appointment.objects.filter(hospital__id=hospitalId, doctor__id=user.id)
        else:
            return []

    def resolve_groupHospitalStaff(root, info, hospitalId, proffesionId):
        return HospitalStaff.objects.filter(hospital__id=hospitalId, proffesion__id=proffesionId)
