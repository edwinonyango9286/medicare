import graphene
from graphene_django import DjangoObjectType
from user.models import User,Location
from django.db.models import Count
import graphql_jwt

class LocationType(DjangoObjectType):
    class Meta:
        model = Location
        fields = ("county_code", "county_name", "constituency_code", "constituency_name")

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "phone_number", "location", "email", "is_staff")

class Query(graphene.ObjectType):
    all_locations = graphene.List(LocationType)
    all_counties = graphene.List(LocationType)
    locations_by_county = graphene.List(LocationType, county_code=graphene.String(required=True))
    user_data = graphene.Field(UserType, user_id=graphene.String(required=True))

    def resolve_all_locations(root, info):
        return Location.objects.all()

    def resolve_all_counties(root,info):
        return Location.objects.values('county_code','county_name').annotate(count=Count('county_code')).order_by()

    def resolve_locations_by_county(root, info, county_code):
        return Location.objects.filter(county_code=county_code)

    def resolve_user_data(root,info,user_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        else:
            try:
                return User.objects.get(id=user_id)
            except User.DoesNotExist:
                return None

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)