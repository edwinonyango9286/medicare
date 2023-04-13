from django.urls import path
from user.views import ChangePassword, Login, Register,AllStaff,UserData,ViewUser,ChangePassword,UpdateProfile,DeleteAccount
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path(route="login/",view=Login.as_view()),
    path(route="register/",view=Register.as_view()),
    path(route="<user_id>/view/",view=ViewUser.as_view()),
    path(route="profile/",view=UserData.as_view()),
    path(route="doctors/all/",view=AllStaff.as_view()),
    path(route="change-password/",view=ChangePassword.as_view()),
    path(route="update-profile/",view=UpdateProfile.as_view()),
    path(route="delete-account/",view=DeleteAccount.as_view()),
]