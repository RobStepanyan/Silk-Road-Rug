# Generated by Django 3.1 on 2020-09-22 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_auto_20200922_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rug',
            name='In',
            field=models.IntegerField(db_column='in', default=75, verbose_name='Insurance (price)'),
        ),
    ]
