from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import SpotifyInfo, Instrument, Song, Element, File


class SpotifyInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpotifyInfo
        fields = ('access_token', 'refresh_token', 'device_id')


class UserSerializer(serializers.ModelSerializer):
    spotify_info = SpotifyInfoSerializer(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'spotify_info')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ['id', 'make', 'model', 'name', 'family',
                  'tonal_range', 'year']


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'album', 'year', 'image', 'genre', 'duration', 'explicit', 'key', 'mode', 'lyrics', 'time_signature', 'tempo',
                  'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'original', 'spotify_url', 'spotify_id']


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = ['name', 'start', 'duration', 'loudness', 'tempo',
                  'key', 'mode', 'lyrics', 'learned', 'time_signature']


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']
