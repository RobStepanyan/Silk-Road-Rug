# Generated by Django 3.1 on 2020-08-17 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200816_2033'),
    ]

    operations = [
        migrations.AddField(
            model_name='rug',
            name='height_inch',
            field=models.IntegerField(default=0, verbose_name='Height Inch X"'),
        ),
        migrations.AddField(
            model_name='rug',
            name='width_inch',
            field=models.IntegerField(default=0, verbose_name='Width Inch X"'),
        ),
        migrations.AlterField(
            model_name='rug',
            name='height_feet',
            field=models.IntegerField(verbose_name="Height Feet X'"),
        ),
        migrations.AlterField(
            model_name='rug',
            name='quanity',
            field=models.IntegerField(default=1, verbose_name='Quanity (Available)'),
        ),
        migrations.AlterField(
            model_name='rug',
            name='width_feet',
            field=models.IntegerField(verbose_name="Width Feet X'"),
        ),
    ]
