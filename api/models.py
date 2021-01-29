from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
# Create your models here.


class SpotifyInfo(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='spotify_info')
    access_token = models.CharField(max_length=500, blank=True)
    refresh_token = models.CharField(max_length=500, blank=True)
    device_id = models.CharField(max_length=500, blank=True)


@receiver(post_save, sender=User)
def create_user_spotify_info(sender, instance, created, **kwargs):
    if created:
        SpotifyInfo.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_spotify_info(sender, instance, **kwargs):
    instance.spotify_info.save()


class Instrument(models.Model):
    make = models.CharField(max_length=50, blank=True)
    model = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=200)
    family = models.CharField(max_length=200, blank=True)
    tonal_range = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        User, related_name="instruments", default=None, on_delete=models.CASCADE)
    year = models.CharField(max_length=4, blank=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    album = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=200, blank=True)
    image = models.CharField(blank=True, max_length=200)
    genre = models.CharField(max_length=200, blank=True)
    duration = models.IntegerField(blank=True, null=True)
    explicit = models.BooleanField(default=False)
    key = models.IntegerField(blank=True, null=True)
    mode = models.IntegerField(blank=True, null=True)
    lyrics = models.TextField(blank=True, null=True)
    time_signature = models.IntegerField(blank=True, null=True)
    tempo = models.FloatField(blank=True, null=True)
    acousticness = models.FloatField(blank=True, null=True)
    danceability = models.FloatField(blank=True, null=True)
    energy = models.FloatField(blank=True, null=True)
    instrumentalness = models.FloatField(blank=True, null=True)
    liveness = models.FloatField(blank=True, null=True)
    loudness = models.FloatField(blank=True, null=True)
    speechiness = models.FloatField(blank=True, null=True)
    valence = models.FloatField(blank=True, null=True)
    original = models.BooleanField(default=False)
    spotify_url = models.CharField(max_length=200, blank=True)
    spotify_id = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    instruments = models.ManyToManyField(
        'Instrument')
    user = models.ForeignKey(User, related_name="songs",
                             default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=200, blank=True)
    start = models.FloatField(blank=True)
    duration = models.FloatField(blank=True, null=True)
    loudness = models.FloatField(blank=True, null=True)
    tempo = models.FloatField(blank=True, null=True)
    key = models.IntegerField(blank=True, null=True)
    mode = models.IntegerField(blank=True, null=True)
    lyrics = models.TextField(blank=True)
    learned = models.BooleanField()
    time_signature = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    song = models.ForeignKey(
        Song, blank=True, null=True, related_name="sections", on_delete=models.CASCADE)
    instruments = models.ManyToManyField(
        'Instrument', related_name="sections", blank=True)
    user = models.ForeignKey(
        User, related_name="sections", default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class File(models.Model):
    file = models.FileField(upload_to="files/%Y/%m/%d")
    extension = models.CharField(max_length=200, blank=True)
    section = models.ForeignKey(
        Section, related_name="files", null=True, on_delete=models.CASCADE)
    song = models.ForeignKey(
        Song, related_name="files", null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="files",
                             default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
