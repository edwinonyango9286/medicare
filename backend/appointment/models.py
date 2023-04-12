from django.db import models
from user.models import User,HospitalStaff
from django.utils.safestring import mark_safe
from uuid import uuid4

class Appointment(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    patient =  models.ForeignKey(User, on_delete=models.CASCADE)
    doctor =  models.ForeignKey(HospitalStaff, on_delete=models.CASCADE)
    appointmentDate = models.DateField()
    createdAt = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True,verbose_name="is active")

    class Meta:
        ordering = ("-isActive","-appointmentDate","-createdAt")

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)

    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.patient.image))

    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.doctor.staff.image))

class Diagnosis(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    doctor =  models.ForeignKey(HospitalStaff,related_name="doctor",on_delete=models.CASCADE)
    patient =  models.ForeignKey(User, related_name="patient",on_delete=models.CASCADE)
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    diagnosis = models.TextField()
    isActive = models.BooleanField(default=True,verbose_name="is active")
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name="made on")

    class Meta:
        ordering = ("-isActive","-createdAt")

    def __str__(self) -> str:
        return "{}->{}".format(self.patient,self.doctor)

    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.patient.image))

    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.doctor.staff.image))

class Prescription(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    diagnosis = models.OneToOneField(Diagnosis, on_delete=models.CASCADE)
    prescription = models.TextField()
    isActive = models.BooleanField(default=True, verbose_name="is active")
    createdAt = models.DateTimeField(auto_now_add=True,verbose_name="prescribed on")

    class Meta:
        ordering = ("-isActive","-createdAt")

    def __str__(self) -> str:
        return f"{self.diagnosis.patient} -> {self.prescription}"

    def patient_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.diagnosis.patient.image))

    def doctor_image(self):
        return mark_safe('<img src="/../../media/%s" width="70" height="70" />' % (self.diagnosis.doctor.staff.image))