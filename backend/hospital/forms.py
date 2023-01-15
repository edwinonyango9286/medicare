from django import forms
from hospital.models import Hospital,Ward

class AddHospitalForm(forms.ModelForm):
    class Meta:
        model = Hospital
        fields = ("name","location")

class AddWardForm(forms.ModelForm):
    class Meta:
        model = Ward
        fields = ("hospital","name","capacity")

