# Generated by Django 3.1 on 2020-10-23 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0084_auto_20201023_0703'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ruggroup',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='rug-groups'),
        ),
    ]
