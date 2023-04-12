from rest_framework.authtoken.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.response import Response
from user.models import User, HospitalStaff, InPatient, InPatientReport, OutPatient, OutPatientReport
from location.models import SubCounty
from user.serializers import UserDataSerializer, HospitalStaffSerializer


class Login(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'success': True, 'token': token.key})
        else:
            return Response({'success': False, 'error': 'Invalid email or password'})


class Register(APIView):
    def post(self, request):
        response = {"success": True, "error": ""}
        try:
            User.objects.get(email=request.data.get("email"))
            response["success"] = False
            response["error"] = "This email is already registered to the system"

        except User.DoesNotExist:
            try:
                User.objects.get(phoneNumber=request.data.get("phoneNumber"))
                response["success"] = False
                response["error"] = "This phone number is already registered to the system"

            except User.DoesNotExist:
                try:
                    User.objects.get(nationalId=request.data.get("nationalId"))
                    response["success"] = False
                    response["error"] = "This national id is already registered to the system"

                except User.DoesNotExist:
                    if len(request.data.get("password")) < 8:
                        response["success"] = False
                        response["error"] = "Password should have at least 8 characters"

                    else:
                        user = User(
                            email=request.data.get("email"),
                            phoneNumber=request.data.get("phoneNumber"),
                            username=request.data.get("username"),
                            dateOfBirth=request.data.get("dateOfBirth"),
                            nationalId=request.data.get("nationalId"),
                            gender=request.data.get("gender"),
                        )

                        user.location = SubCounty.objects.get(subcountyCode=request.data.get("location"))
                        user.set_password(request.data.get("password"))
                        user.save()

        return Response(data=response)


class UserData(APIView):
    serializer_class = UserDataSerializer

    def get(self, request):
        response = {}
        response["user"] = self.serializer_class(User.objects.get(id=request.user.id)).data

        return Response(data=response)


class ViewUser(APIView):
    serializer_class = UserDataSerializer

    def get(self, response, user_id):
        response = {}
        response["user"] = self.serializer_class(User.objects.get(id=user_id)).data

        return Response(data=response)


class ChangePassword(APIView):
    pass


class AllStaff(APIView):
    serializer_class = HospitalStaffSerializer

    def get(self, request):
        response = {}
        response["staff"] = self.serializer_class(HospitalStaff.objects.all(), many=True).data

        return Response(data=response)
