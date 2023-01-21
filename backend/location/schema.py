import graphene
from graphene_django import DjangoObjectType
from location.models import County,SubCounty

class CountyType(DjangoObjectType):
    class Meta:
        model = County
        fields = ("countyCode", "countyName")

class SubCountyType(DjangoObjectType):
    class Meta:
        model = SubCounty
        fields = ("county","subcountyCode", "subcountyName")

class LocationQuery(graphene.ObjectType):
    counties = graphene.List(CountyType)
    countySubcounties = graphene.List(SubCountyType, countyCode=graphene.String(required=True))
    subcounties = graphene.List(SubCountyType)

    def resolve_counties(root, info):
        return County.objects.all()

    def resolve_subcounties(root,info):
        return SubCounty.objects.all()

    def resolve_countySubcounties(root, info, countyCode):
        return SubCounty.objects.filter(county__countyCode=countyCode)