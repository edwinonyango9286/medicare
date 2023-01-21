from django import forms
from django.contrib.auth import get_user_model
from user.models import HospitalStaff,Diagnosis

MedicareUser = get_user_model()

class RegisterForm(forms.ModelForm):
    class Meta:
        model = MedicareUser
        password2 = forms.CharField(max_length=15)
        fields = ["firstName","lastName","email", "phoneNumber","dateOfBirth", "gender","image","location","nationalId","password"]

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        
        return user

class RegisterHospitalStaffForm(forms.ModelForm):
    class Meta:
        model = HospitalStaff
        fields = ["staff","hospital","proffesion"]
        
class AddDiagnosisForm(forms.ModelForm):
    class Meta:
        model = Diagnosis
        fields = ["doctor","patient","appointment","doctor","diagnosis"]
