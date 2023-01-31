import graphene
import graphql_jwt
from graphene_file_upload.scalars import Upload
from user.forms import RegisterForm,RegisterHospitalStaffForm,AddAppointmentForm
from user.models import HospitalStaff, Appointment
from django.contrib.auth import get_user_model
from location.models import SubCounty

User = get_user_model()

class RegisterUserMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        firstName = graphene.String()
        lastName = graphene.String()
        email = graphene.String()
        phoneNumber = graphene.String()
        gender = graphene.String()
        location = graphene.String()
        image = Upload()
        nationalId = graphene.String()
        password = graphene.String()
        password2 = graphene.String()
        dateOfBirth = graphene.Date()

    def mutate(root, info,password2, image=None, **data):
        file_data = {}

        if len(data["password"]) < 8:
            return RegisterUserMutation(success=False,error = "The password should have at least 8 characters")

        if data["password"] != password2:
            return RegisterUserMutation(success=False,error = "The passwords do not match")

        if image:
            file_data = {"image":image}

        form = RegisterForm(data=data,files=file_data)

        if form.is_valid():
            form.save()
            return RegisterUserMutation(success=True)

        else:
            proceed = True
            for value in data:
                if len(value.strip()) == 0:
                    proceed = False
                    return RegisterForm(success="Please fill out all fields")

            if proceed:
                nerror = []
                allerror = form.error.get_json_data()
                for error in allerror:
                    for x_error in allerror[error]:
                        nerror.append(x_error["message"])

                return RegisterUserMutation(success=False,error=nerror[0])

class RegisterHospitalStaffMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        staff = graphene.String()
        hospital = graphene.String()
        proffesion = graphene.String()

    def mutate(root, info, **data):
        authUser = info.context.user
        if authUser.is_authenticated:
            if authUser.is_staff:
                form = RegisterHospitalStaffForm(data=data)
                if form.is_valid:
                    try:
                        userExists = HospitalStaff.objects.get(staff__id=form.data["staff"])
                        return RegisterHospitalStaffMutation(success=False, error="This user is already registered as staff member")

                    except HospitalStaff.DoesNotExist:
                        form.save()
                        User.objects.filter(id=form.data["staff"]).update(hospitalStaff=True)
                        return RegisterHospitalStaffMutation(success=True, error="")

                else:
                    return RegisterHospitalStaffMutation(success=False, error="Please fill out the form with valid data")

            else:
                return RegisterHospitalStaffMutation(success=False, error="You are not allowed to perform this function")

        else:
            return RegisterHospitalStaffMutation(success=False, error="Authentication credentials not provided")

class DeleteHospitalStaffMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        staffId = graphene.String()

    def mutate(root, info, staffId):
        authUser = info.context.user
        if authUser.is_authenticated and authUser.is_staff:
            try:
                HospitalStaff.objects.get(staff__id=staffId)
                HospitalStaff.objects.filter(staff__id=staffId).delete()
                User.objects.filter(id=staffId).update(hospitalStaff=False)

                return DeleteHospitalStaffMutation(success=True, error="")

            except HospitalStaff.DoesNotExist:
                return DeleteHospitalStaffMutation(success=False, error="This user is not registered as hospital staff")

        else:
            return DeleteHospitalStaffMutation(success=False, error="You are not allowed to perform this function")

class UpdateUserMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        email = graphene.String(required=False)
        phoneNumber = graphene.String(required=False)
        location = graphene.String(required=False)
        image = Upload(required=False)
        password = graphene.String(required=False)
        password2 = graphene.String(required=False)

    def mutate(root, info, image=None, **data):
        authUser = info.context.user
        proceed = True
        if authUser.is_authenticated:
            if ("email" in data) and len(data["email"].strip()) > 0:
                try:
                    proceed = False
                    User.objects.get(email=data["email"])
                    return UpdateUserMutation(success=False, error="A user with this email address already exists")

                except User.DoesNotExist:
                    pass

            if ("phoneNumber" in data) and len(data["phoneNumber"].strip()) > 0:
                try:
                    proceed = False
                    User.objects.get(phoneNumber=data["phoneNumber"])
                    return UpdateUserMutation(success=False, error="A user with this phone number address already exists")

                except User.DoesNotExist:
                    pass

            if ("password" in data) and len(data["password"].strip()) > 0:
                if len(data["password"]) < 8:
                    proceed = False
                    return UpdateUserMutation(success=False, error="Password must have at least 8 characters")
                
                else:
                    if ("password2" in data) and (data["password"] == data["password2"]):
                        user = User.objects.get(id=info.context.user.id)
                        if user.check_password(data["password"]):
                            user.set_password(data["password"])
                            return UpdateUserMutation(success=True, error=False)
                        
                        else:
                            return UpdateUserMutation(success=False, error="password entered is wrong")
                    
                    else:
                        proceed = False
                        return UpdateUserMutation(success=False, error="Passwords should match")

            if proceed:
                if image:
                    User.objects.filter(id=authUser.id).update(image=image)

                if ("email" in data) and len(data["email"].strip()) > 0:
                    User.objects.filter(id=authUser.id).update(email=data["email"])

                if ("location" in data) and len(data["location"].strip()) > 0:
                    User.objects.filter(id=authUser.id).update(location=SubCounty.objects.get(id=data["location"]))

                if ("phoneNumber" in data) and len(data["phoneNumber"].strip()) > 0:
                    User.objects.filter(id=authUser.id).update(phoneNumber=data["phoneNumber"])

                if ("password" in data) and len(data["password"].strip()) > 0:
                    updateUser = User.objects.get(id=authUser.id)
                    updateUser.set_password(data["password"])
                    updateUser.save()

                return UpdateUserMutation(success=True, error="")

            else:
                return UpdateUserMutation(success=False, error="Please fill out the form and try again")

        
        else:
            return UpdateUserMutation(success=False, error="Authentication credentials not provided")

class AddAppointmentMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        hospitalId = graphene.String()
        doctorId = graphene.String()

    def mutate(root, info, doctorId, hospitalId):
        authUser = info.context.user
        if authUser.is_authenticated:
            try:
                Appointment.objects.get(patient__id=authUser.id,isActive=True)
                return AddAppointmentMutation(success=False, error="You have an active appointment")

            except Appointment.DoesNotExist:
                appointmet_data = {"hospital":hospitalId,"doctor":doctorId,"patient":info.context.user.id}
                form = AddAppointmentForm(data=appointmet_data)
                
                return AddAppointmentMutation(success=True, error=appointmet_data)

        else:
            return AddAppointmentMutation(success=False, error="Please login to proceed")

class UserMutation(graphene.ObjectType):
    registerUser = RegisterUserMutation.Field()
    addHospitalStaff = RegisterHospitalStaffMutation.Field()
    deleteHospitalStaff = DeleteHospitalStaffMutation.Field()
    addAppointment = AddAppointmentMutation.Field()
    updateUser = UpdateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()