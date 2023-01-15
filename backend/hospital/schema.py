from graphene_django import DjangoObjectType
from hospital.models import Ward,Hospital
import graphene

class HospitalType(DjangoObjectType):
    class Meta:
        model = Hospital
        fields = ("name","location")

class WardType(DjangoObjectType):
    class Meta:
        model = Ward
        fields = ("hospital","name","capacity")

class HospitalQuery(graphene.ObjectType):
    allHospitals = graphene.List(HospitalType)
    hospital = graphene.Field(HospitalType, hospitalId=graphene.String())
    hospitalWards = graphene.List(WardType, hospitalId=graphene.String())
    ward = graphene.Field(WardType, hospitalId=graphene.String(), wardId=graphene.String())

    def resolve_allHospitals(root, info):
        return Hospital.objects.all()

    def resolve_hospital(root, info, hospitalId):
        return Hospital.objects.get(id=hospitalId)

    def resolve_hospitalWards(root, info, hospitalId):
        return Ward.objects.filter(hospital__id=hospitalId)

    def resolve_ward(root, info, hospitalId, wardId):
        return Ward.objects.get(hospital__id=hospitalId, id=wardId)

