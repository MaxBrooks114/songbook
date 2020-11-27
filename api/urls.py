from .api import InstrumentViewSet, SongViewSet, ElementViewSet, RegisterAPI, LoginAPI, UserAPI, UserProfileChangeAPIView, FileViewSet
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from knox import views as knox_views
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('api/instruments', InstrumentViewSet, 'instruments')
router.register('api/songs', SongViewSet, 'songs')
router.register('api/elements', ElementViewSet, 'elements')
router.register('api/files', FileViewSet, 'files')


urlpatterns = [path('api/auth', include('knox.urls')),
               path('api/auth/register', RegisterAPI.as_view()),
               path('api/auth/login', LoginAPI.as_view()),
               path('api/auth/logout', knox_views.LogoutView.as_view(),
                    name="knox_logout"),
               path('api/auth/user', UserAPI.as_view()),
               path('api/auth/user/edit',
                    UserProfileChangeAPIView.as_view(), name='changeProfile'),
               path(
    "api/spotify/callback", views.SpotifyCallbackView.as_view(), name="spotify callback"
),
    path('api/spotify/login/<int:user_id>', views.SpotifyLoginView.as_view(),
         name="spotify login"),



] + router.urls
