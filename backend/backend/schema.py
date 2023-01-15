import graphene
from user.queries import UserQuery
from user.mutations import UserMutation
from location.schema import LocationQuery
from hospital.schema import HospitalQuery
from hospital.mutations import HospitalMutations

class Query(UserQuery, LocationQuery, HospitalQuery, graphene.ObjectType):
    pass

class Mutation(UserMutation, HospitalMutations, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query,mutation=Mutation)
