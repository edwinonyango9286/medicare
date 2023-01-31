from django.contrib import admin
from datetime import datetime
from django.utils.html import format_html
from user.models import Proffesion,HospitalStaff,Appointment,Prescription,Diagnosis,InPatient,InPatientReport,OutPatient,OutPatientReport
from django.views.generic.detail import DetailView
from django.urls import path, reverse
from user.forms import AddDiagnosisForm,AddInPatientForm
from django.shortcuts import redirect
from django.db.models import Q, F
from hospital.models import Hospital, Ward
from django.contrib.admin.models import LogEntry
from django.utils.translation import gettext_lazy
from django.contrib.auth import get_user_model

User = get_user_model()

current_date = datetime.now().date()

def get_edit_text(issuper : bool) -> str:
    if issuper:
        return "edit"
    
    else:
        return "view"
    
class ActionUserFilter(admin.SimpleListFilter):
    title = gettext_lazy('action user')
    
    parameter_name = 'user'
    
    def lookups(self, request, model_admin):
        fields = []
        for user in User.objects.filter(is_staff=True):
            fields.append((user.id,user.email))
            
        return fields
    
    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset
        return queryset.filter(user__id=self.value())
    
@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    list_display = ("action_time","model_changed","user_action","action_object","changed_by")
    list_per_page = 20
    list_filter = ("content_type__model","action_time",ActionUserFilter)
    
    def model_changed(self, obj):
        return f"{obj.content_type.app_label} -> {obj.content_type.model}"
    
    def user_action(self, obj):
        userActions = {
                "1":"Addition",
                "2":"change",
                "3":"deletion",
            }
        
        return userActions[str(obj.action_flag)]
    
    def changed_by(self,obj):
        return obj.user.email
    
    def action_object(self,obj):
        return obj.object_repr
    


class CurrentUserMixin(object):
    def changelist_view(self, request, extra_content=None):
        setattr(self, 'authMedicareUser', request.user)
        return super().changelist_view(request, extra_content)
    
class ViewUserActions(DetailView):
    template_name = "admin/user/user/UserActions.html"
    model = User
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }

@admin.register(User)
class UserAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("image_tag","name","email","gender","age","phone_number","county","location","action_links")
    list_per_page = 20
    search_fields = ("firstName__startswith","lastName__startswith")
    list_filter = ("location__county","location","dateOfBirth")
    
    def get_form(self, request, obj, **kwargs):
        exclude_fields = ['password','image']
        if obj:
            if obj.id != request.user.id:
                exclude_fields += ['nationalId']
                if not self.authMedicareUser.is_admin():
                    exclude_fields += ['is_staff','is_superuser','last_login']
                    pass
            
        self.exclude = exclude_fields
        return super(UserAdmin, self).get_form(request, obj, **kwargs)
    
    def change_view(self, request, object_id, form_url='', extra_context=None):
        user_pk = ""
        user_pk+=object_id
        try:
            user_pk = user_pk[0:user_pk.index("/")]
        
        except:
            pass
        
        extra_context = extra_context or {}
        if User.objects.get(id=user_pk).image:
            extra_context['medicareimageurl'] = User.objects.get(id=user_pk).image.url
        return super().change_view(request, object_id, form_url, extra_context)
            
    def county(self, obj):
        if obj.location:
            return obj.location.county.countyName
        
        else:
            return "_"
    
    def age(self, obj):
        if obj.dateOfBirth:
            return (current_date - obj.dateOfBirth).days // 365
        else:
            return 0
    
    def phone_number(self,obj):
        return obj.phoneNumber
    
    def name(self,obj):
        if obj.firstName or obj.lastName:
            return f"{obj.firstName} {obj.lastName}"
    
        else:
            return "_"
    
    def action_links(self, obj):
        url = "/admin/user/user/"
        view_url = reverse("admin:user_user_change",args=[obj.pk])
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                </div>
            '''
        )
        
    def get_urls(self):
        return [
            path(
                "<pk>/actions",
                self.admin_site.admin_view(ViewUserActions.as_view()),
                name=f"view_user_actions"
            ),
            *super().get_urls(),
        ]

@admin.register(Proffesion)
class ProffesionAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("id","type","group","action_links")
    list_per_page = 20
    
    def action_links(self, obj):
        url = "/admin/user/proffesion/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                </div>
            '''
        )

@admin.register(HospitalStaff)
class HospitalStaffAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("id","name","email","hospital","role","action_links")
    list_per_page = 20
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
                    <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                </div>
            '''
        )
        
    def get_queryset(self, request):
        if request.user.is_authenticated:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request).filter(hospital__id=authAdmin.hospital.id)
            
            except HospitalStaff.DoesNotExist:
                if self.authMedicareUser.is_admin():
                    return super().get_queryset(request)
                
                else:
                    return  super().get_queryset(request=request).filter(id=None)
                
class CancelAppointment(DetailView):
    model = Appointment
    template_name = "admin/user/appointment/CancelAppointment.html"
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }
        
    def post(self, request,pk):
        url = reverse("admin:user_appointment_changelist")
        Appointment.objects.filter(id=pk).update(isActive=False)
        return redirect(url)

@admin.register(Appointment)
class AppointmentAdmin(CurrentUserMixin,admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","hospital","createdAt","isActive","action_links")
    list_per_page = 20
    list_filter = ("doctor","doctor__hospital","patient__location__county","patient__location","isActive")
    
    def get_urls(self):
        return [
            path(
                "<pk>/cancel",
                self.admin_site.admin_view(CancelAppointment.as_view()),
                name=f"cancel_appointment"
            ),
            *super().get_urls(),
        ]
    
    def user_view_url(self,user_id):
        return reverse("admin:user_user_change",args=[user_id])
    
    def doctor_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.doctor.staff.id])
        return format_html(
            f"""<a href="{self.user_view_url(obj.doctor.staff.id)}">
            {obj.doctor.staff.firstName.upper()} {obj.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.patient.firstName.upper()} {obj.patient.lastName.upper()}
            </a>"""
        ) 
    
    def action_links(self,obj):
        url = "/admin/user/appointment/"
        addDiagnosisUrl = reverse("admin:add_patient_diagnosis",args=[obj.id])
        if self.authMedicareUser.is_admin():
            return format_html(
                f'''
                    <div style="display:flex;flex-direction:row;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                    </div>
                '''
            )
        
        else:
            CancelAppointmentUrl = reverse("admin:cancel_appointment",args=[obj.id])
            if obj.isActive:
                return format_html(
                    f'''
                        <div style="display:flex;flex-direction:row;">
                            <a class="button default" style="padding:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                            <a class="button default" style="padding:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;background:red;" href="{CancelAppointmentUrl}">cancel</a>
                        </div>
                        <div style="display:flex;flex-direction:row;margin-top:1em;">
                            <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{addDiagnosisUrl}">
                                Make Diagnosis
                            </a>
                        </div>
                    '''
                )
            
            else:
                return format_html(
                    f'''
                        <div style="display:flex;flex-direction:row;">
                            <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                        </div>
                    '''
                )
            
        
    def get_queryset(self, request):
        if self.authMedicareUser.is_admin():
            return super().get_queryset(request)
        
        else:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request=request).filter(doctor__id=authAdmin.id)
            
            except HospitalStaff.DoesNotExist:
                return super().get_queryset(request).filter(id=0)
            
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "doctor":
            kwargs['queryset'] = HospitalStaff.objects.filter(staff__id=request.user.id)
            
        elif db_field.name == "patient":
            kwargs['queryset'] = User.objects.filter(~Q(id=request.user.id))
            
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

@admin.register(Prescription)
class PrescriptionAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","prescription","isActive","createdAt")
    list_per_page = 20
    list_editable = ("isActive",)
    list_filter = ("diagnosis__doctor","diagnosis__patient")
    
    def doctor_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.diagnosis.doctor.staff.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.diagnosis.doctor.staff.firstName.upper()} {obj.diagnosis.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.diagnosis.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.diagnosis.patient.firstName.upper()} {obj.diagnosis.patient.lastName.upper()}
            </a>"""
        )    
                
class AddDiagnosis(DetailView):
    template_name = "admin/user/appointment/AddDiagnosis.html"
    model = Appointment
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }
        
    def post(self, request,*args,**kwargs):
        url = reverse("admin:user_diagnosis_changelist")
        form = AddDiagnosisForm(data=request.POST)
        self.object = self.get_object()
        context = self.get_context_data(**kwargs)
        if form.is_valid():
            context['form'] = AddDiagnosisForm
            Appointment.objects.filter(id=form.data['appointment']).update(isActive=False)
            form.save()
            return redirect(url)
            
        else:
            context['form'] = form
        return self.render_to_response(context=context)

@admin.register(Diagnosis)
class DiagnosisAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","diagnosis","createdAt","action_links")
    list_per_page = 20
    
        
    def get_urls(self):
        return [
            path(
                "<pk>/add-diagnosis",
                self.admin_site.admin_view(AddDiagnosis.as_view()),
                name=f"add_patient_diagnosis"
            ),
            *super().get_urls(),
        ]
        
    def doctor_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.doctor.staff.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.doctor.staff.firstName.upper()} {obj.doctor.staff.lastName.upper()}
            </a>"""
        )
    
    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.patient.id])
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
                    <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                </div>
            '''
        )
        
    def get_queryset(self, request):
        if self.authMedicareUser.is_admin():
            return super().get_queryset(request=request)
        
        else:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request=request).filter(doctor__id=authAdmin.id)
            
            except HospitalStaff.DoesNotExist:
                return  super().get_queryset(request=request).filter(id=None)

class DischargeInPatient(DetailView):
    template_name = "admin/user/inpatient/DischargePatient.html"
    model = InPatient
    inpatient_url = "/admin/user/inpatient"
    
    def get(self, request, *args, **kwargs):
        try:
            testpatient = InPatient.objects.get(id=kwargs['pk'])
            if not testpatient.isActive:
                return redirect(self.inpatient_url)
            
        except InPatient.DoesNotExist:
            return redirect(self.inpatient_url)
        
        return super().get(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }
        
    def post(self, request, pk):
        inpatient = InPatient.objects.get(id=pk)
        Ward.objects.filter(id=inpatient.ward.id).update(occupancy=F('occupancy')-1)
        InPatient.objects.filter(id=pk).update(isActive=False,dischargedBy=HospitalStaff.objects.get(staff__id=request.user.id),dischargedOn=datetime.now())
        
        return redirect(self.inpatient_url)

@admin.register(InPatient)
class InPatientAdmin(CurrentUserMixin, admin.ModelAdmin):
    form = AddInPatientForm
    list_display = ("image_tag","id","patient_name","hospital","ward_no","createdAt","isActive","discharged_by","dischargedOn","action_links")
    list_per_page = 20
    list_filter = ("ward","ward__hospital","patient__location__county","patient__location")
    
    def discharged_by(self, obj):
        if obj.dischargedBy != None:
            viewdoctorurl = reverse("admin:user_user_change",args=[obj.dischargedBy.staff.id])
            return format_html(
                f"""
                    <a style="color:navy;" href={viewdoctorurl}>
                        {obj.dischargedBy.staff.firstName} {obj.dischargedBy.staff.lastName} <br />
                        {obj.dischargedBy.staff.email}
                    </a>
                """
            )
        
    def get_urls(self):
        return [
            path(
                "<pk>/discharge-inpatient",
                self.admin_site.admin_view(DischargeInPatient.as_view()),
                name=f"discharge_inpatient"
            ),
            *super().get_urls(),
        ]
    
    def get_queryset(self, request):
        if self.authMedicareUser.is_admin():
            return super().get_queryset(request)
        
        else:
            try:
                authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
                return super().get_queryset(request=request).filter(ward__hospital=authAdmin.hospital)
                
            except HospitalStaff.DoesNotExist:
                return super().get_queryset(request=request).filter(id=None)
    
    def action_links(self, obj):
        url = "/admin/user/inpatient/"
        dischargePatientUrl = reverse("admin:discharge_inpatient",args=[obj.id])
        
        if obj.isActive:
            return format_html(
                f'''
                    <div style="display:flex;flex-direction:row;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                    </div>
                    <div style="display:flex;flex-direction:row;margin-top:1em;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;background:green;" href="{dischargePatientUrl}">
                            Discharge
                        </a>
                    </div>
                '''
            )
            
        else:
            return format_html(
                f'''
                    <div style="display:flex;flex-direction:row;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                    </div>
                '''
            )
            
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "ward":
            kwargs['queryset'] = Ward.objects.filter(~Q(occupancy=F("capacity")),occupancy__gte=0)
            
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
        
@admin.register(InPatientReport)
class InPatientReportAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("id","patient","createdAt")
    list_per_page = 20
    list_filter = ("doctor","patient__patient__location__county","patient__patient__location")
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        authAdmin = HospitalStaff.objects.get(staff__id=request.user.id)
        if db_field.name == "patient":
            kwargs['queryset'] = InPatient.objects.filter(ward__hospital=authAdmin.hospital,isActive=True)
            
        elif db_field.name == "doctor":
            if self.authMedicareUser.is_admin():
                pass
            
            else:
                kwargs['queryset'] = HospitalStaff.objects.filter(staff__id=request.user.id)
        
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
class DischargeOutPatient(DetailView):
    template_name = "admin/user/outpatient/DischargePatient.html"
    model = OutPatient
    outpatient_url = "/admin/user/outpatient"
    
    def get(self, request, *args, **kwargs):
        try:
            testpatient = OutPatient.objects.get(id=kwargs['pk'])
            if not testpatient.isActive:
                return redirect(self.outpatient_url)
            
        except OutPatient.DoesNotExist:
            return redirect(self.outpatient_url)
        
        return super().get(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts" : self.model._meta
        }
        
    def post(self, request, pk):
        OutPatient.objects.filter(id=pk).update(isActive=False,dischargedBy=HospitalStaff.objects.get(staff__id=request.user.id),dischargedOn=datetime.now())
        
        return redirect(self.outpatient_url)

@admin.register(OutPatient)
class OutPatientAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("image_tag","patient_name","location","admitted_on","isActive","dischargedOn","discharged_by","action_links")
    list_per_page = 20
    list_filter = ("patient__location__county","patient__location")
    
    def discharged_by(self, obj):
        if obj.dischargedBy != None:
            viewdoctorurl = reverse("admin:user_user_change",args=[obj.dischargedBy.staff.id])
            return format_html(
                f"""
                    <a style="color:navy;" href={viewdoctorurl}>
                        {obj.dischargedBy.staff.firstName} {obj.dischargedBy.staff.lastName} <br />
                        {obj.dischargedBy.staff.email}
                    </a>
                """
            )
        
    def get_urls(self):
        return [
            path(
                "<pk>/discharge-outpatient",
                self.admin_site.admin_view(DischargeOutPatient.as_view()),
                name=f"discharge_outpatient"
            ),
            *super().get_urls(),
        ]
    
    def admitted_on(self, obj):
        return obj.createdAt
    
    def patient_name(self, obj):
        return f"{obj.patient.firstName} {obj.patient.lastName}"
    
    def location(self, obj):
        return f"{obj.patient.location.county.countyName}, {obj.patient.location.subcountyName}"
    
    def action_links(self, obj):
        url = "/admin/user/outpatient/"
        dischargePatientUrl = reverse("admin:discharge_outpatient",args=[obj.id])
        
        if obj.isActive:
            return format_html(
                f'''
                    <div style="display:flex;flex-direction:row;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                    </div>
                    <div style="display:flex;flex-direction:row;margin-top:1em;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;background:green;" href="{dischargePatientUrl}">
                            Discharge
                        </a>
                    </div>
                '''
            )
            
        else:
            return format_html(
                f'''
                    <div style="display:flex;flex-direction:row;">
                        <a class="button default" style="width:6.5rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;margin-right:1em;" href="{url}{obj.id}/change/">{get_edit_text(self.authMedicareUser.is_admin())}</a>
                    </div>
                '''
            )

@admin.register(OutPatientReport)
class OutPatientReportAdmin(CurrentUserMixin, admin.ModelAdmin):
    list_display = ("patient","doctor","report")