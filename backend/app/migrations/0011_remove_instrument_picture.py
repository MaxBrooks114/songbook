# Generated by Django 3.0.8 on 2020-08-11 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20200725_0316'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instrument',
            name='picture',
        ),
    ]