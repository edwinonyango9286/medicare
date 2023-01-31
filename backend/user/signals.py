from django.db.models.signals import post_delete,post_save,pre_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models import F
from user.models import HospitalStaff,InPatient,Proffesion
from hospital.models import Ward

User = get_user_model()

@receiver(post_delete, sender=HospitalStaff)
def drop_user_staff(sender, instance, **kwargs):
    user = User.objects.get(id=instance.staff.id)
    user.is_staff = False
    user.groups.clear()
    user.save()
    
@receiver(post_save, sender=HospitalStaff)
def make_user_staff(sender, instance, **kwargs):
    user = User.objects.get(id=instance.staff.id)
    user.groups.clear()
    user.is_staff = True
    user.groups.add(instance.proffesion.group)
    user.save()
    
@receiver(post_save, sender=InPatient)
def update_inpatient(sender, instance, **kwargs):
    if instance.isActive:
        Ward.objects.filter(id=instance.ward.id).update(occupancy=F('occupancy')+1)
    elif not instance.isActive:
        Ward.objects.filter(id=instance.ward.id).update(occupancy=F('occupancy')-1)
        
@receiver(pre_save, sender=User)
def capitalize_names(sender, instance, **kwargs):
    if instance.firstName:
        instance.firstName = instance.firstName.upper()
    if instance.lastName:
        instance.lastName = instance.lastName.upper()