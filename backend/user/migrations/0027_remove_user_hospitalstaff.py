# Generated by Django 4.1.4 on 2023-01-21 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0026_remove_proffesion_permission_proffesion_group'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='hospitalStaff',
        ),
    ]
