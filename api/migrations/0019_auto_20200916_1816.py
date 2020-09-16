# Generated by Django 3.0.8 on 2020-09-16 18:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0018_spotifyinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='spotifyinfo',
            old_name='access_Token',
            new_name='access_token',
        ),
        migrations.AlterField(
            model_name='spotifyinfo',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='spotify_info', to=settings.AUTH_USER_MODEL),
        ),
    ]
