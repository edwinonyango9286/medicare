# Generated by Django 4.1.7 on 2023-04-07 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0009_alter_ward_id_delete_hospital'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ward',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
