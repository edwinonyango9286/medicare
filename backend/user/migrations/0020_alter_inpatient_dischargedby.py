# Generated by Django 4.1.4 on 2023-01-19 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0019_inpatient_dischargedby_alter_appointment_isactive_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inpatient',
            name='dischargedBy',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='user.hospitalstaff'),
        ),
    ]
