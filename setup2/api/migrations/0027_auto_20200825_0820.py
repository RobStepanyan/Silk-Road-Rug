# Generated by Django 3.1 on 2020-08-25 08:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_auto_20200825_0807'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rug',
            name='height_largest',
        ),
        migrations.RemoveField(
            model_name='rug',
            name='height_smallest',
        ),
        migrations.RemoveField(
            model_name='rug',
            name='width_largest',
        ),
        migrations.RemoveField(
            model_name='rug',
            name='width_smallest',
        ),
    ]
