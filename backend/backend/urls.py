from django.contrib import admin
from django.urls import path,include
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie
from graphene_file_upload.django import FileUploadGraphQLView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from graphql_jwt.backends import get_user_by_token
from graphql_jwt.exceptions import JSONWebTokenError

def test(request):
    user = None
    try:
        user = get_user_by_token(request.headers['Authorization'])
    except JSONWebTokenError:
        user= None
    print(user)
    return JsonResponse({'data':'data'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api',csrf_exempt(jwt_cookie(FileUploadGraphQLView.as_view(graphiql=True)))),
    path('test/',test)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
