from django.contrib import admin
from django.urls import path,include
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie
from graphene_file_upload.django import FileUploadGraphQLView
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def home(request):
    return render(request=request,template_name='medicare/home.html')

urlpatterns = [
    path('__reload__/',include("django_browser_reload.urls")),
    path('admin/', admin.site.urls),
    path("api", csrf_exempt(jwt_cookie(FileUploadGraphQLView.as_view(graphiql=True)))),
    path('',home,name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
