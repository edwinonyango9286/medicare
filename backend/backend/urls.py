from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie
from graphene_file_upload.django import FileUploadGraphQLView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api", csrf_exempt(jwt_cookie(FileUploadGraphQLView.as_view(graphiql=True)))),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
