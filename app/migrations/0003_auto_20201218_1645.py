# Generated by Django 3.1.4 on 2020-12-18 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_mapuniversity'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mapuniversity',
            options={'verbose_name': 'Map University', 'verbose_name_plural': 'Map Universities'},
        ),
        migrations.RenameField(
            model_name='mapuniversity',
            old_name='langitude',
            new_name='latitude',
        ),
    ]