from django import forms
from appointment.models import Diagnosis,Appointment

class AddAppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ["doctor","patient"]

class AddDiagnosisForm(forms.ModelForm):
    class Meta:
        model = Diagnosis
        fields = ["doctor","patient","appointment","doctor","diagnosis"]
