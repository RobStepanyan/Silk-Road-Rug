# Generated by Django 3.1 on 2020-08-21 10:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20200819_2243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rugvariation',
            name='rug',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_query_name='variation', to='api.rug'),
        ),
    ]
