from django.urls import path
from user.views import ChangePassword, Login, Register,AllStaff,UserData,ViewUser

urlpatterns = [
    path(route="login/",view=Login.as_view()),
    path(route="register/",view=Register.as_view()),
    path(route="<user_id>/view/",view=ViewUser.as_view()),
    path(route="profile/",view=UserData.as_view()),
    path(route="staff/all/",view=AllStaff.as_view()),
]