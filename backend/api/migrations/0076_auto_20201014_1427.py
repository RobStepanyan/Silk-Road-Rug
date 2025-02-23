# Generated by Django 3.1 on 2020-10-14 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0075_contactus_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contactus',
            options={'verbose_name': 'Contact Us Request'},
        ),
        migrations.RenameField(
            model_name='contactus',
            old_name='text',
            new_name='message',
        ),
        migrations.AlterField(
            model_name='contactus',
            name='status',
            field=models.CharField(choices=[('n', 'Not Reviewed'), ('r', 'Reviewed')], default='n', max_length=1),
        ),
    ]
