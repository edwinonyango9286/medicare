from django.urls import path
from location.views import AllLocations

urlpatterns = [
    path(route="all/",view=AllLocations.as_view()),
]