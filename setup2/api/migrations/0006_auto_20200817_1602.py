# Generated by Django 3.1 on 2020-08-17 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200817_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rug',
            name='priceUSD',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name='Price (USD)'),
        ),
    ]
