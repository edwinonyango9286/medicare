# Generated by Django 4.1.4 on 2023-01-23 05:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0031_alter_appointment_options_alter_diagnosis_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin',
        ),
    ]
