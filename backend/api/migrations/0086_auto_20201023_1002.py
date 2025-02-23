# Generated by Django 3.1 on 2020-10-23 17:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0085_auto_20201023_0706'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rug',
            name='group_by_age',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='rug_a', to='api.ruggroup', verbose_name='Group by Age (e.g. Vintage)*'),
        ),
        migrations.AlterField(
            model_name='rug',
            name='group_by_type',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to='api.ruggroup', verbose_name='Group by Type (e.g. Runner)*'),
        ),
        migrations.AlterField(
            model_name='ruggroup',
            name='image',
            field=models.ImageField(default='default-rug.png', upload_to='rug-groups'),
        ),
    ]
