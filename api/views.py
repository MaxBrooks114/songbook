import base64
from django.views.generic.base import RedirectView, TemplateView
from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from django.urls import reverse
from django.http import HttpResponseRedirect
from furl import furl
import requests
import urllib


AUTH_HEADER = {
    "Authorization": "Basic "
    + base64.b64encode(
        "377e14d3659f45caad70d5fa4edbefb0:8ccca168c1b34c009080187429a8f5d6".encode()
    ).decode()
}


class SpotifyLoginView(RedirectView):
    query_string = True

    def get_redirect_url(self, *args, **kwargs):
        params = {
            "client_id": "377e14d3659f45caad70d5fa4edbefb0",
            "response_type": "code",
            "redirect_uri": self.request.build_absolute_uri("callback"),
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
        }

        url = "https://accounts.spotify.com/authorize?" + \
            urllib.parse.urlencode(params)
        print(url)
        return url


class SpotifyCallbackView(RedirectView):
    def handle_callback(self, request):
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
        refresh_token = auth_items["refresh_token"]
        print(access_token)
        return HttpResponseRedirect('http://localhost:3000/users/1' + '?access_token=' + access_token + '&'+'refresh_token=' + refresh_token)
