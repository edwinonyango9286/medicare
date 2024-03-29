# Generated by Django 4.1.7 on 2023-04-07 10:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('hospital', '0007_alter_hospital_id_alter_ward_id'),
        ('user', '0039_remove_diagnosis_appointment_remove_diagnosis_doctor_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True, verbose_name='is active')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.hospitalstaff')),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital.hospital')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-isActive', '-createdAt'),
            },
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diagnosis', models.TextField()),
                ('isActive', models.BooleanField(default=True, verbose_name='is active')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='made on')),
                ('appointment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='appointment.appointment')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to='user.hospitalstaff')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-isActive', '-createdAt'),
            },
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prescription', models.TextField()),
                ('isActive', models.BooleanField(default=True, verbose_name='is active')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='prescribed on')),
                ('diagnosis', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='appointment.diagnosis')),
            ],
            options={
                'ordering': ('-isActive', '-createdAt'),
            },
        ),
    ]
