# Generated by Django 3.1.4 on 2020-12-18 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MapUniversity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('university', models.CharField(max_length=50)),
                ('institute', models.CharField(max_length=50)),
                ('langitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('color', models.CharField(max_length=15)),
                ('href', models.TextField()),
            ],
        ),
    ]
