# Generated by Django 4.1.4 on 2023-01-21 21:01

from django.db import migrations, models
import user.models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0027_remove_user_hospitalstaff'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inpatient',
            options={'ordering': ('-isActive', '-createdAt')},
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default='profiles/default.jpg', null=True, upload_to=user.models.upload_profileImage),
        ),
    ]
