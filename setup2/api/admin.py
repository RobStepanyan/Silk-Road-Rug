from django.contrib import admin
from . import models

admin.site.site_header = 'Silk Road Rug Inc'
admin.site.site_title = 'Silk Road Rug Inc'
admin.site.index_title = 'Admin'


class RugImageInline(admin.TabularInline):
    model = models.RugImage
    extra = 3


class RugAdmin(admin.ModelAdmin):
    inlines = [RugImageInline, ]


admin.site.register(models.Rug, RugAdmin)
