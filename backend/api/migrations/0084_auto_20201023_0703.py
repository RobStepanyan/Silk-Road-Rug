# Generated by Django 3.1 on 2020-10-23 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0083_auto_20201023_0419'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ruggroup',
            name='description',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
