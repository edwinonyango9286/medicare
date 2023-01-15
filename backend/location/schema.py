import graphene
from graphene_django import DjangoObjectType
from location.models import County,SubCounty

class CountyType(DjangoObjectType):
    class Meta:
        model = County
        fields = ("county_code", "county_name")

class SubCountyType(DjangoObjectType):
    class Meta:
        model = SubCounty
        fields = ("county","subcounty_code", "subcounty_name")

class LocationQuery(graphene.ObjectType):
    counties = graphene.List(CountyType)
    countySubcounties = graphene.List(SubCountyType, county_code=graphene.String(required=True))
    subcounties = graphene.List(SubCountyType)

    def resolve_counties(root, info):
        return County.objects.all()

    def resolve_subcounties(root,info):
        return SubCounty.objects.all()

    def resolve_countySubcounties(root, info, county_code):
        return SubCounty.objects.filter(county__county_code=county_code)