# Generated by Django 3.1.4 on 2020-12-18 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20201218_1645'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mapuniversity',
            name='institute',
            field=models.CharField(max_length=75),
        ),
    ]
