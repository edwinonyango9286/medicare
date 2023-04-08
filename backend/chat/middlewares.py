from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()

async def get_user(scope):
    if "query_string" not in scope:
        return AnonymousUser()
    query_params = parse_qs(scope["query_string"].decode())
    token = query_params.get("token", [None])[0]
    if not token:
        return AnonymousUser()
    try:
        decoded_token = AccessToken(token)
        user = User.objects.get(id=decoded_token["user_id"])
        return user
    except (InvalidToken, TokenError, User.DoesNotExist):
        return AnonymousUser()

class TokenAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params.get("token", [None])[0]
        if not token:
            scope["user"] = AnonymousUser()
            return await self.app(scope, receive, send)
        try:
            decoded_token = AccessToken(token)
            user = User.objects.get(id=decoded_token["user_id"])
            scope["user"] = user
        except (InvalidToken, TokenError, User.DoesNotExist):
            scope["user"] = AnonymousUser()
        return await self.app(scope, receive, send)
