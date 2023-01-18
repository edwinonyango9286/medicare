from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin
from location.models import SubCounty
from hospital.models import Hospital,Ward
from slugify import slugify
from django.contrib import admin
import os
from django.utils.safestring import mark_safe

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
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['nationalId',"phoneNumber"]

    objects = UserManager()

    def __str__(self) -> str:
        return self.email
    
    def  image_tag(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.image))


    image_tag.allow_tags = True

class Proffesion(models.Model):
    type = models.CharField(max_length=20)
    description = models.TextField(null=True,blank=True)
    
    class Meta:
        ordering = ("id",)

    def __str__(self) -> str:
        return self.type

class HospitalStaff(models.Model):
    staff = models.OneToOneField(User,on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    proffesion = models.ForeignKey(Proffesion,on_delete=models.SET_NULL,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return "{}->{}->{}".format(self.staff, self.proffesion, self.hospital)
    
    def  image_tag(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.staff.image))

class Appointment(models.Model):
    patient =  models.ForeignKey(User, on_delete=models.CASCADE)
    doctor =  models.ForeignKey(HospitalStaff, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)
    
    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.patient.image))
    
    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.doctor.staff.image))

class Diagnosis(models.Model):
    doctor =  models.ForeignKey(HospitalStaff,related_name="doctor",on_delete=models.CASCADE)
    patient =  models.ForeignKey(User, related_name="patient",on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE)
    diagnosis = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)
    
    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.patient.image))
    
    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.doctor.staff.image))

class Prescription(models.Model):
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    prescription = models.TextField()
    isActive = models.BooleanField(default=True) 
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.diagnosis.patient} -> {self.prescription}"
    
    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.diagnosis.patient.image))
    
    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.diagnosis.doctor.staff.image))

class InPatient(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    ward = models.ForeignKey(Ward,on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True) 
    createdAt = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ("id",)

    def __str__(self) -> str:
        return str(self.patient)
    
    def  image_tag(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.patient.image))

class InPatientReport(models.Model):
    patient = models.ForeignKey(InPatient,on_delete=models.CASCADE)
    doctor = models.ForeignKey(HospitalStaff, on_delete=models.CASCADE)
    report = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.patient

class OutPatient(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.patient

class OutPatientReport(models.Model):
    patient = models.ForeignKey(OutPatient,on_delete=models.CASCADE)
    report = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.patient