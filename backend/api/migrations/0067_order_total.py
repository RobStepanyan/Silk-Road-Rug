# Generated by Django 3.1 on 2020-10-10 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0066_auto_20201008_0811'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name='Order Total'),
        ),
    ]
