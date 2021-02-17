import base64
from django.views.generic.base import RedirectView
from .models import User
from rest_framework import views
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.views.generic.edit import DeleteView
import requests
import urllib
import os

KEY = str(os.getenv('SPOTIFY_KEY'))
SECRET = str(os.getenv('SPOTIFY_SECRET'))

auth = KEY + ":" + SECRET
AUTH_HEADER = {
    "Authorization": "Basic "
    + base64.b64encode(
        auth.encode()
    ).decode()
}


class SpotifyTokenView(views.APIView):
    def handle_callback(self, request):
        response = requests.post(
            "https://accounts.spotify.com/api/token",
            headers=AUTH_HEADER,
            data={
                "grant_type": "client_credentials",
            },
        )
        return response.json()

    def get(self, request, *args, **kwargs):
        auth_items = self.handle_callback(request)
        access_token = auth_items["access_token"]
        return HttpResponse(access_token)


class SpotifyLoginView(RedirectView):
    query_string = True

    def get_redirect_url(self, * args, **kwargs):
        user_id = self.request.build_absolute_uri('?').split('/')[-1]
        self.request.session['user_id'] = user_id
        params = {
            "client_id": KEY,
            "response_type": "code",
            "redirect_uri": self.request.build_absolute_uri("callback").replace('/login', ''),
            "scope":  " ".join(
                [
                    'user-read-currently-playing',
                    'user-modify-playback-state',
                    'user-read-playback-state',
                    'streaming',
                    'app-remote-control',
                    'playlist-read-collaborative',
                    'playlist-modify-public',
                    'playlist-read-private',
                    'playlist-modify-private',
                    'user-library-modify',
                    'user-top-read',
                    'user-read-playback-position',
                    'user-read-recently-played',
                ]

            ),
            "show_dialog": True,
        }

        url = "https://accounts.spotify.com/authorize?" + \
            urllib.parse.urlencode(params)

        return url


class SpotifyCallbackView(views.APIView):

    def handle_callback(self, request):
        if self.request.session.get('user_id', False):
            user_id = self.request.session['user_id']
            self.request.user = User.objects.get(id=user_id)

        if request.GET.get("refresh_token", False):
            refresh_token = request.GET["refresh_token"]
            response = requests.post(
                "https://accounts.spotify.com/api/token",
                data={
                    "grant_type": "refresh_token",
                    "refresh_token": refresh_token,

                },
                headers=AUTH_HEADER,
            )
            return response.json()
        else:
            code = request.GET["code"]
            response = requests.post(
                "https://accounts.spotify.com/api/token",
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": request.build_absolute_uri("callback"),

                },
                headers=AUTH_HEADER,
            )
            return response.json()

    def get(self, request, *args, **kwargs):
        auth_items = self.handle_callback(request)
        access_token = auth_items["access_token"]
        user = self.request.user
        user.spotify_info.access_token = access_token

        if "refresh_token" in auth_items.keys():
            refresh_token = auth_items["refresh_token"]
            user.spotify_info.refresh_token = refresh_token

        else:
            refresh_token = ""
        user.save()
        if refresh_token != "":
            return HttpResponseRedirect('http://localhost:3000/users/' + str(self.request.user.id) + '/progress')
        else:
            return HttpResponse(access_token)
