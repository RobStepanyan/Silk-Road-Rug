# Generated by Django 3.1 on 2020-10-21 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0080_auto_20201021_1210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rugimage',
            name='image',
            field=models.ImageField(default='default-rug.png', upload_to='rugs'),
        ),
    ]
