# Generated by Django 3.1 on 2020-08-25 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_auto_20200824_1819'),
    ]

    operations = [
        migrations.AddField(
            model_name='rug',
            name='height_largest',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rug',
            name='height_smallest',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rug',
            name='width_largest',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rug',
            name='width_smallest',
            field=models.IntegerField(default=0),
        ),
    ]
