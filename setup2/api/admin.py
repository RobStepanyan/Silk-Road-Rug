from django.contrib import admin
from . import models, forms, variables
from django.forms.models import BaseInlineFormSet

admin.site.site_header = 'Silk Road Rug Inc'
admin.site.site_title = 'Silk Road Rug Inc'
admin.site.index_title = 'Admin'


class RugVariationInline(admin.TabularInline):
    model = models.RugVariation
    extra = 1


class RugShippingMethodFormset(BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        kwargs['initial'] = [{'Type': x[0], 'price': x[1]}
                             for x in variables.DEFAULT_SHIPPING_METHODS]
        super(RugShippingMethodFormset, self).__init__(*args, **kwargs)


class RugShippingMethodVariation(admin.TabularInline):
    model = models.RugShippingMethod
    extra = len(variables.DEFAULT_SHIPPING_METHODS)
    formset = RugShippingMethodFormset


class RugAdditionalServiceFormset(BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        kwargs['initial'] = [{'Type': x[0], 'price': x[1]}
                             for x in variables.DEFAULT_ADDITIONAL_SERVICES]
        super(RugAdditionalServiceFormset, self).__init__(*args, **kwargs)


class RugAdditionalServiceVariation(admin.TabularInline):
    model = models.RugAdditionalService
    extra = len(variables.DEFAULT_ADDITIONAL_SERVICES)
    formset = RugAdditionalServiceFormset


@admin.register(models.Rug)
class RugAdmin(admin.ModelAdmin):
    form = forms.RugAdminForm
    inlines = (RugVariationInline, RugShippingMethodVariation,
               RugAdditionalServiceVariation)

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        form.save_images(form.instance)


admin.site.register(models.Address)
admin.site.register(models.CartItem)
