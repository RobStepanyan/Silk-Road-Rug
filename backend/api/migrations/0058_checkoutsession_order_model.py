# Generated by Django 3.1 on 2020-10-06 08:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0057_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkoutsession',
            name='order_model',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='api.order'),
            preserve_default=False,
        ),
    ]
