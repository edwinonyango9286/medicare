from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin
from location.models import SubCounty
from hospital.models import Hospital,Ward
from slugify import slugify
from django.contrib import admin
import os

class UserManager(BaseUserManager):
    def create_superuser(self,email,password,nationalId,phoneNumber):
        user = self.model(email=self.normalize_email(email))
        user.nationalId = nationalId
        user.phoneNumber = phoneNumber
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self.db)
        return user

gender_choices = [
    ["FEMALE","FEMALE"],
    ["MALE","MALE"],
    ["OTHER","OTHER"]
]

def upload_profileImage(instance,filename):
    image_name = slugify(instance.nationalId)
    _, extension = os.path.splitext(filename)

    return f"profiles/{image_name}{extension}"

class User(AbstractBaseUser,PermissionsMixin):
    firstName = models.CharField(max_length=20,null=True,blank=True)
    lastName = models.CharField(max_length=20,null=True,blank=True)
    email = models.EmailField(max_length=50,unique=True)
    phoneNumber = models.CharField(max_length=15,unique=True)
    nationalId = models.CharField(max_length=15,unique=True)
    gender = models.CharField(max_length=10,choices=gender_choices,blank=True,null=True)
    dateOfBirth = models.DateField(blank=True,null=True)
    location = models.ForeignKey(SubCounty,on_delete=models.SET_NULL,null=True,blank=True)
    image = models.ImageField(upload_to=upload_profileImage,blank=True,null=True)
    hospitalStaff = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['nationalId',"phoneNumber"]

    objects = UserManager()

    def __str__(self) -> str:
        return self.email
admin.site.register(User)

class Proffesion(models.Model):
    type = models.CharField(max_length=20)
    description = models.TextField(null=True,blank=True)

    def __str__(self) -> str:
        return self.type
admin.site.register(Proffesion)

class HospitalStaff(models.Model):
    staff = models.OneToOneField(User,on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    proffesion = models.ForeignKey(Proffesion,on_delete=models.SET_NULL,null=True)
    
    def __str__(self) -> str:
        return "{}->{}->{}".format(self.staff, self.proffesion, self.hospital)
admin.site.register(HospitalStaff)

class Appointment(models.Model):
    patient =  models.ForeignKey(User, on_delete=models.CASCADE)
    doctor =  models.ForeignKey(HospitalStaff, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)
admin.site.register(Appointment)

class PatientRecord(models.Model):
    doctor =  models.ForeignKey(HospitalStaff,related_name="doctor",on_delete=models.CASCADE)
    patient =  models.ForeignKey(User, related_name="patient",on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    diagnosis = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)
admin.site.register(PatientRecord)

class Prescription(models.Model):
    appointment = models.ForeignKey(Appointment,on_delete=models.CASCADE)
    prescription = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.appointment
admin.site.register(Prescription)

class InPatient(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    ward = models.ForeignKey(Ward,on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True) 
    admittedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.patient)
admin.site.register(InPatient)

class OutPatient(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    admittedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.patient
admin.site.register(OutPatient)

class OutPatientReport(models.Model):
    patient = models.ForeignKey(OutPatient,on_delete=models.CASCADE)
    report = models.TextField()
    recordedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.patient
admin.site.register(OutPatientReport)