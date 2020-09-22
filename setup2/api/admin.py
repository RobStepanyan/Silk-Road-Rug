from django.contrib import admin
from . import models, forms, variables
from django.forms.models import BaseInlineFormSet

admin.site.site_header = 'Silk Road Rug Inc'
admin.site.site_title = 'Silk Road Rug Inc'
admin.site.index_title = 'Admin'


class RugVariationInline(admin.TabularInline):
    model = models.RugVariation
    extra = 1


@admin.register(models.Rug)
class RugAdmin(admin.ModelAdmin):
    form = forms.RugAdminForm
    inlines = (RugVariationInline, )

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        form.save_images(form.instance)


admin.site.register(models.Address)
admin.site.register(models.CartItem)
