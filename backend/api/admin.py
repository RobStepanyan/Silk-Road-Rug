from import_export.admin import ImportExportModelAdmin
from import_export import resources
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


class ContactUsAdmin(admin.ModelAdmin):
    def make_reviewed(self, request, queryset):
        rows_updated = queryset.update(status='r')
        if rows_updated == 1:
            message_bit = "1 request was"
        else:
            message_bit = "%s requests were" % rows_updated
        self.message_user(
            request, "%s successfully marked as reviewed." % message_bit)
    make_reviewed.short_description = 'Mark selected requests as reviewed'

    def make_not_reviewed(self, request, queryset):
        rows_updated = queryset.update(status='n')
        if rows_updated == 1:
            message_bit = "1 request was"
        else:
            message_bit = "%s requests were" % rows_updated
        self.message_user(
            request, "%s successfully marked as not reviewed." % message_bit)
    make_not_reviewed.short_description = 'Mark selected requests as not reviewed'

    list_display = ['email', 'title', 'status']
    ordering = ['status']
    actions = [make_reviewed, make_not_reviewed]


class RugGroupResource(resources.ModelResource):

    class Meta:
        model = models.RugGroup


class RugGroupAdmin(ImportExportModelAdmin):
    pass


admin.site.register(models.Address)
admin.site.register(models.CartItem)
admin.site.register(models.RugImage)
admin.site.register(models.Order)
admin.site.register(models.CheckoutSession)
admin.site.register(models.ContactUs, ContactUsAdmin)
admin.site.register(models.RugGroup, RugGroupAdmin)
