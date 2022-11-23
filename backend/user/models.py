from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager

class Location(models.Model):
	county_code = models.IntegerField()
	county_name = models.CharField(max_length=15)
	constituency_code = models.IntegerField()
	constituency_name = models.CharField(max_length=15)

	def __str__(self):
		return "{}->{}".format(self.county_name,self.constituency_name)

class UserManager(BaseUserManager):
	def create_superuser(self,email,phone_number,password):
		user = self.model(email=email)
		user.phone_number = phone_number
		user.is_staff=True
		user.is_superuser = True
		user.set_password(password)
		user.save(using=self.db)
		return user

def location_default():
	return Location.objects.get(id=179)

class User(AbstractBaseUser,PermissionsMixin):
	first_name = models.CharField(max_length=15,null=True)
	last_name = models.CharField(max_length=15,null=True)
	phone_number = models.CharField(max_length=15,unique=True)
	location = models.ForeignKey(Location,on_delete=models.CASCADE,default=location_default)
	email = models.EmailField(max_length=50,unique=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['phone_number']

	objects = UserManager()

	def __str__(self):
		return self.email
