from rest_framework import serializers
from .models import Instrument, Song, Element, File


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ['make', 'model', 'name', 'family',
                  'tonal_range', 'picture', 'year']


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['title', 'artist', 'album', 'year', 'image', 'genre', 'duration', 'explicit', 'key', 'mode', 'lyrics', 'time_signature', 'tempo',
                  'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'original', 'spotify_url', 'spotify_id']


class ElementSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = ['name', 'start', 'duration', 'loudness', 'tempo',
                  'key', 'mode', 'lyrics', 'learned', 'time_signature']


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']
