# Generated by Django 3.1 on 2020-08-17 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20200817_2015'),
    ]

    operations = [
        migrations.AddField(
            model_name='rugvariation',
            name='is_sample',
            field=models.BooleanField(default=False, verbose_name='Sample (True / False)'),
        ),
    ]
