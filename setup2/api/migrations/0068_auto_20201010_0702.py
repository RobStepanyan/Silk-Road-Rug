# Generated by Django 3.1 on 2020-10-10 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0067_order_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rugimage',
            name='rug',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image', related_query_name='image', to='api.rug'),
        ),
    ]
