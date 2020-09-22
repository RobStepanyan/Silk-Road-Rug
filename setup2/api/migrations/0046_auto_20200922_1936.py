# Generated by Django 3.1 on 2020-09-22 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_auto_20200918_2057'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rugshippingmethod',
            name='rug',
        ),
        migrations.AddField(
            model_name='rug',
            name='In',
            field=models.IntegerField(default=75, verbose_name='Insurance (price)'),
        ),
        migrations.AddField(
            model_name='rug',
            name='es',
            field=models.IntegerField(default=150, verbose_name='Expedited Shipping (price)'),
        ),
        migrations.AddField(
            model_name='rug',
            name='gs',
            field=models.IntegerField(default=100, verbose_name='Ground Shipping (price)'),
        ),
        migrations.AddField(
            model_name='rug',
            name='sr',
            field=models.IntegerField(default=0, verbose_name='Signature Release Required (price)'),
        ),
        migrations.AddField(
            model_name='rug',
            name='wc',
            field=models.IntegerField(default=0, verbose_name='Will-Call Pick Up (price)'),
        ),
        migrations.AddField(
            model_name='rug',
            name='wg',
            field=models.IntegerField(default=50, verbose_name='White Glove Delivery (price)'),
        ),
        migrations.DeleteModel(
            name='RugAdditionalService',
        ),
        migrations.DeleteModel(
            name='RugShippingMethod',
        ),
    ]
