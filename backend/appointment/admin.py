from django.contrib import admin
from django.utils.html import format_html
from user.models import User,HospitalStaff
from django.views.generic import View,DetailView
from django.shortcuts import render, redirect
from django.urls import path, reverse
from django.db.models import Q

from user.admin import get_edit_text,CurrentUserMixin
from appointment.forms import AddDiagnosisForm
from appointment.models import Appointment,Diagnosis,Prescription

class AddAppointment(View):
    template_name = "admin/user/appointment/AddAppointment.html"

    def get(self, request):
        context = {**admin.site.each_context(self.request)}
        context["patients"] = User.objects.filter(~Q(id=request.user.id))
        return render(request=request,template_name=self.template_name,context=context)

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
    list_display = ("id","doctor_image","doctor_name","patient_image","patient_name","createdAt","isActive","action_links")
    list_per_page = 20
    list_filter = ("doctor","patient__location__county","patient__location","isActive")

    def get_urls(self):
        return [
            path(
                "<pk>/cancel",
                self.admin_site.admin_view(CancelAppointment.as_view()),
                name=f"cancel_appointment"
            ),
            path(
                "add/",
                self.admin_site.admin_view(AddAppointment.as_view()),
                name = f"add_appointment"
            ),
            *super().get_urls(),
        ]

    def user_view_url(self,user_id):
        return reverse("admin:user_user_change",args=[user_id])

    def doctor_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.doctor.staff.id])
        return format_html(
            f"""<a href="{self.user_view_url(obj.doctor.staff.id)}">
            {obj.doctor.staff.username.upper()}
            </a>"""
        )

    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.patient.username.upper()}
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
            {obj.diagnosis.doctor.staff.username.upper()}
            </a>"""
        )

    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.diagnosis.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.diagnosis.patient.username.upper()}
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
            {obj.doctor.staff.username.upper()}
            </a>"""
        )

    def patient_name(self, obj):
        view_url = reverse("admin:user_user_change",args=[obj.patient.id])
        return format_html(
            f"""<a href="{view_url}">
            {obj.patient.username.upper()}
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

