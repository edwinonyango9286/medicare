from django.contrib import admin
from hospital.models import Ward
from django.utils.html import format_html
from location.models import SubCounty
from django.contrib.contenttypes.models import ContentType

admin.site.register(ContentType)
@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ("id","name","capacity","occupancy","remaining_slots","action_links")

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