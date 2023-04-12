from django.urls import path
from appointment.views import MakeAppointment,ViewAppointments,ViewAppointment,CancelAppointment

urlpatterns = [
    path(route="add/",view=MakeAppointment.as_view()),
    path(route="all/",view=ViewAppointments.as_view()),
    path(route="<pk>/view/",view=ViewAppointment.as_view()),
    path(route="<pk>/cancel/",view=CancelAppointment.as_view()),
]