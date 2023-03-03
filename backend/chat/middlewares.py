from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from graphql_jwt.backends import get_user_by_token
from graphql_jwt.exceptions import JSONWebTokenError

@database_sync_to_async
def get_user(scope):
    from django.contrib.auth.models import AnonymousUser
    if "token" not in scope:
        raise ValueError("Cannot find token in scope. You should wrap your consumer in TokenAuthMiddleware.")
    token = scope["token"]
    user = None
    try:
        user = get_user_by_token(token)
    except JSONWebTokenError:
        pass
    
    return user or AnonymousUser()

class TokenAuthMiddleware:
    def __init__(self, app):
        self.app = app
        
    async def __call__(self, scope, receive, send):
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        scope["token"] = token
        scope["user"] = await get_user(scope)
        return await self.app(scope, receive, send)