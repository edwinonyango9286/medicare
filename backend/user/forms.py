from django import forms
from django.contrib.auth import get_user_model
from user.models import HospitalStaff,InPatient
from hospital.models import Ward

User = get_user_model()

class RegisterForm(forms.ModelForm):
    class Meta:
        model = User
        password2 = forms.CharField(max_length=15)
        fields = ["username","email", "phoneNumber","dateOfBirth", "gender","location","nationalId","password"]

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()

        return user

class RegisterHospitalStaffForm(forms.ModelForm):
    class Meta:
        model = HospitalStaff
        fields = ["staff","proffesion"]

class AddInPatientForm(forms.ModelForm):
    class Meta:
        model = InPatient
        fields = ["patient","ward"]

    def clean(self):
        ward = self.cleaned_data['ward']
        patient = self.cleaned_data['patient']
        if ward.occupancy == ward.capacity:
            raise forms.ValidationError("Ward chosen is at full capacity")

        if InPatient.objects.filter(patient__id=patient.id,isActive=True):
            raise forms.ValidationError("This patient has an active admission")

        return super().clean()
