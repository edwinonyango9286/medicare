import graphene
from user.schema import Query as UserQuery
from user.schema import Mutation as UserMutaion

class Query(UserQuery,graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")

class Mutation(UserMutaion,graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query,mutation=Mutation)
