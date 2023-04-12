# Generated by Django 4.1.4 on 2023-01-18 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('county_code', models.IntegerField(primary_key=True, serialize=False)),
                ('county_name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SubCounty',
            fields=[
                ('subcounty_code', models.IntegerField(primary_key=True, serialize=False)),
                ('subcounty_name', models.CharField(max_length=20)),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='location.county')),
            ],
        ),
    ]
