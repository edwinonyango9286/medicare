# Generated by Django 4.1.4 on 2023-01-18 06:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_rename_patientrecord_diagnosis_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inpatient',
            old_name='admittedAt',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='outpatient',
            old_name='admittedAt',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='outpatientreport',
            old_name='recordedAt',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='dateCreated',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='dateUpdated',
            new_name='updatedAt',
        ),
        migrations.AddField(
            model_name='hospitalstaff',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='prescription',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]