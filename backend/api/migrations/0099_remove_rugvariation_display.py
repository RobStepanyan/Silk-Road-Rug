# Generated by Django 3.1 on 2020-10-26 18:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0098_rugvariation_display'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rugvariation',
            name='display',
        ),
    ]
