from django.db import models
from django.utils import timezone
from django.conf import settings
# Create your models here.


class Instrument(models.Model):
    # attributes
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    family = models.CharField(max_length=200)
    tonal_range = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    year = models.CharField(max_length=4)
    # relationships
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    songs = models.ManyToManyField(Song, on_delete=models.DO_NOTHING)
    elements = models.ManyToManyField(Element, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    album = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    genre = models.CharField(max_length=200, blank=True)
    duration = models.IntegerField(blank=True)
    explicit = models.BooleanField(default=False)
    key = models.IntegerField(blank=True)
    mode = models.IntegerField(blank=True)
    time_signature = models.IntegerField(blank=true)
    tempo = models.FloatField(blank=True)
    acousticness = models.FloatField(blank=True)
    danceability = models.FloatField(blank=True)
    energy = models.FloatField(blank=True)
    instrumentalness = models.FloatField(blank=True)
    liveness = models.FloatField(blank=True)
    loudness = models.FloatField(blank=True)
    speechiness = models.FloatField(blank=True)
    valence = models.FloatField(blank=True)
    original = models.BooleanField(default=False)
    spotify_url = models.CharField(max_length=200, blank=True)
    spotify_id = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
