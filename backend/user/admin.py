from django.contrib import admin
from django.contrib.auth.models import Group
from datetime import datetime
from django.utils.html import format_html
from user.models import User,Proffesion,HospitalStaff,Appointment,Prescription,Diagnosis,InPatient,OutPatient,OutPatientReport
from django.views.generic.detail import DetailView
from django.urls import path, reverse

# admin.site.unregister(Group)

current_date = datetime.now().date()

class ViewUser(DetailView):
    template_name = "admin/user/user/ViewUser.html"
    model = User
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("image_tag","name","email","gender","age","phone_number","action_links")
    search_fields = ("firstName__startswith","lastName__startswith")
    
    def get_queryset(self, request):
        if request.user.is_superuser:
            return super().get_queryset(request)
        
        else:
            return super().get_queryset(request).filter(id=request.user.id)
    
    def age(self, obj):
        return (current_date - obj.dateOfBirth).days // 365
    
    def phone_number(self,obj):
        return obj.phoneNumber
    
    def name(self,obj):
        return f"{obj.firstName} {obj.lastName}"
    
    def action_links(self, obj):
        url = "/admin/user/user/"
        view_url = reverse("admin:view_user_details",args=[obj.pk])
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{view_url}">view</a>
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )
        
    def get_urls(self):
        return [
            path(
                "<pk>/details",
                self.admin_site.admin_view(ViewUser.as_view()),
                name=f"view_user_details"
            ),
            *super().get_urls(),
        ]

@admin.register(Proffesion)
class ProffesionAdmin(admin.ModelAdmin):
    list_display = ("id","type","action_links")
    
    def action_links(self, obj):
        url = "/admin/user/proffesion/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )

@admin.register(HospitalStaff)
class HospitalStaffAdmin(admin.ModelAdmin):
    list_display = ("name","email","hospital","role","action_links")
    list_filter = ("hospital","proffesion")
    # search_fields = ("hospital__startswith",)
    
    def name(self, obj):
        return f"{obj.staff.firstName} {obj.staff.lastName}"
    
    def email(self, obj):
        return obj.staff.email
    
    def role(self, obj):
        return obj.proffesion.type
    
    def action_links(self, obj):
        url = "/admin/user/hospitalstaff/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )
        
    def get_queryset(self, request):
        if request.user.is_authenticated:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request).filter(hospital__id=authAdmin.hospital.id)
            
            except HospitalStaff.DoesNotExist:
                if request.user.is_superuser:
                    return super().get_queryset(request)
                
                else:
                    return  super().get_queryset(request=request).filter(id=None)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","hospital","createdAt","action_links")
    
    def doctor_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.doctor.staff.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.doctor.staff.firstName.upper()} {obj.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.patient.firstName.upper()} {obj.patient.lastName.upper()}
            </a>"""
        ) 
    
    def action_links(self, obj):
        url = "/admin/user/appointment/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","prescription","isActive","createdAt")
    list_editable = ("isActive",)
    
    def doctor_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.diagnosis.doctor.staff.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.diagnosis.doctor.staff.firstName.upper()} {obj.diagnosis.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.diagnosis.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.diagnosis.patient.firstName.upper()} {obj.diagnosis.patient.lastName.upper()}
            </a>"""
        )    

@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","hospital","diagnosis","createdAt","action_links")
    
    def doctor_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.doctor.staff.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.doctor.staff.firstName.upper()} {obj.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:view_user_details",args=[obj.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.patient.firstName.upper()} {obj.patient.lastName.upper()}
            </a>"""
        )       
    
    def action_links(self, obj):
        url = "/admin/user/diagnosis/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )
        
    def get_queryset(self, request):
        if request.user.is_superuser:
            return super().get_queryset(request=request)
        
        else:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request=request).filter(doctor=authAdmin.id)
            
            except HospitalStaff.DoesNotExist:
                return  super().get_queryset(request=request).filter(id=None)

@admin.register(InPatient)
class InPatientAdmin(admin.ModelAdmin):
    list_display = ("image_tag","id","patient_name","hospital","ward_no","admitted_on","isActive","action_links")
    list_filter = ("ward",)
    list_editable = ("isActive",)
    
    def get_queryset(self, request):
        if request.user.is_superuser:
            return super().get_queryset(request)
        
        else:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request=request).filter(ward__hospital=authAdmin.hospital)
                
            except HospitalStaff.DoesNotExist:
                return super().get_queryset(request=request).filter(id=None)
    
    def admitted_on(self, obj):
        return obj.createdAt
    
    def patient_name(self, obj):
        return f"{obj.patient.firstName} {obj.patient.lastName}"
    
    def ward_no(self, obj):
        return obj.ward.name
    
    def hospital(self, obj):
        return obj.ward.hospital.name
    
    def action_links(self, obj):
        url = "/admin/user/inpatient/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )

@admin.register(OutPatient)
class OutPatientAdmin(admin.ModelAdmin):
    pass

@admin.register(OutPatientReport)
class OutPatientReportAdmin(admin.ModelAdmin):
    pass