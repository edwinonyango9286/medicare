from django.db.models.signals import pre_save
from django.dispatch import receiver
from hospital.models import Ward

@receiver(pre_save,sender=Ward)
def check_hospitalName(sender, instance, **kwargs):
    instance.name = instance.name.upper()