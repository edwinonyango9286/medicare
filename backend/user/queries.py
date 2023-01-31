import graphene
from user.models import Proffesion, HospitalStaff, Appointment, Diagnosis, Prescription, InPatient, OutPatient, OutPatientReport
from user.schema import UserType,ProffesionType, HospitalStaffType, AppointmentType, DiagnosisType, PrescriptionType, InPatientType, OutPatientType, OutPatientReportType
from django.contrib.auth import get_user_model

User = get_user_model()

class UserQuery(graphene.ObjectType):
    user_data = graphene.Field(UserType)
    proffesions = graphene.List(ProffesionType)
    allHospitalStaff = graphene.List(HospitalStaffType, hospitalId = graphene.String(required=False))
    groupHospitalStaff = graphene.List(HospitalStaffType, hospitalId = graphene.String(required=False), proffesionId=graphene.String())
    hospitalStaff = graphene.Field(HospitalStaffType, hospitalId = graphene.String(required=False), staffId = graphene.String(required=False))
    hospitalAppointments = graphene.List(AppointmentType, hospitalId = graphene.String(required=False))
    doctorAppointments = graphene.List(AppointmentType, hospitalId = graphene.String(), staffId = graphene.String(required=False))
    inPatient = graphene.Field(InPatientType, hospitalId=graphene.String(required=False), patientId=graphene.String(required=False)) 
    inPatients = graphene.List(InPatientType, hospitalId=graphene.String(required=False))
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

    def resolve_hospitalStaff(root, info, staffId=None, hospitalId=None):
        authUser = info.context.user
        print(authUser.id)
        if authUser.is_authenticated:
            authStaff = HospitalStaff.objects.get(staff__id="1")
            if hospitalId and staffId:
                return HospitalStaff.objects.filter(hospital__id=hospitalId, staff__id=staffId)
            
            elif staffId and not hospitalId:
                return HospitalStaff.objects.filter(hospital__id=authStaff.hospital, staff__id=staffId)
            
            elif not(hospitalId and staffId):
                return HospitalStaff.objects.filter(hospital__id=authStaff.hospital, staff__id=authStaff.staff)
        
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
