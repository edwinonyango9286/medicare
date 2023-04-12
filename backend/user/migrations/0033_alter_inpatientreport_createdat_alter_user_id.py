# Generated by Django 4.1.4 on 2023-02-05 17:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0032_remove_user_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inpatientreport',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, verbose_name='reported at'),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
