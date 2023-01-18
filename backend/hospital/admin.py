from django.contrib import admin
from hospital.models import Hospital,Ward
from django.utils.html import format_html
from location.models import SubCounty

@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("id","name","county","constituency","action_links")
    search_fields = ("name__startswith", )
    list_filter = ("location",)
    
    def county(self,obj):
        return SubCounty.objects.get(subcounty_code=obj.location.subcounty_code).county
    
    def constituency(self,obj):
        return SubCounty.objects.get(subcounty_code=obj.location.subcounty_code).subcounty_name
    
    def action_links(self, obj):
        url = "/admin/hospital/hospital/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ("id","hospital","name","capacity","occupancy","remaining_slots","action_links")
    list_filter = ("hospital",)
    
    def remaining_slots(self,obj):
        return obj.capacity - obj.occupancy
    
    def action_links(self, obj):
        url = "/admin/hospital/ward/"
        return format_html(
            f'''
                <div style="display:flex;flex-direction:row;">
                    <a class="default" style="margin-right:1em;" href="{url}{obj.id}/change/">edit</a>
                    <a class="deletelink" href="{url}{obj.id}/delete/">delete</a>
                </div>
            '''
        )