from django.contrib import admin
from django.urls import path,include
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/",include("user.urls")),
    path("location/",include("location.urls")),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
