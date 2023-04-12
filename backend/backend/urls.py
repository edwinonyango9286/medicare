from django.contrib import admin
from django.urls import path,include
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(
        "api/",include([
                path("user/",include("user.urls")),
                path("location/",include("location.urls")),
                path("appointment/",include("appointment.urls")),
            ]
        )
    ),
    path('admin/', admin.site.urls)
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
