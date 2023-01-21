from django.db.models.signals import post_delete,post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from user.models import HospitalStaff
from django.contrib.auth.models import Group

User = get_user_model()

@receiver(post_delete,sender=HospitalStaff)
def drop_user_staff(sender, instance, **kwargs):
    user = User.objects.get(id=instance.staff.id)
    user.is_staff = False
    user.is_admin = False
    user.groups.clear()
    user.save()
    
@receiver(post_save,sender=HospitalStaff)
def make_user_staff(sender, instance,created, **kwargs):
    user = User.objects.get(id=instance.staff.id)
    user.groups.clear()
    user.is_staff = True
    
    if instance.proffesion.group.name == "hospitalAdmin":
        user.is_admin = True
    else:
        user.is_admin = False
        
    user.groups.add(instance.proffesion.group)
    user.save()
    
    
    # def update_staff
    
    
    
    # def save(self, force_insert, force_update, using, update_fields) -> None:
    #     if self.isActive:
    #         User.objects.filter(id=self.staff__id).update(hospitalStaff=True)
    #     elif not self.isActive:
    #         Ward.objects.filter(id=self.ward.id).update(occupancy=F('occupancy')-1)
            
    #     if force_insert:
    #         return super().save(force_insert=force_insert, using=using, update_fields=update_fields)
        
    #     if force_update:
    #         return super().save(force_update=force_update, using=using, update_fields=update_fields)
        
    #     else:
    #         return super().save(using=using,update_fields=update_fields)