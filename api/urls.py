from .api import ChangePasswordView, DeleteUser, InstrumentViewSet, SongViewSet, SectionViewSet, RegisterAPI, LoginAPI, UserAPI, UpdateProfileView, FileViewSet, DeleteUser
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from knox import views as knox_views
from . import views
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
router.register('api/instruments', InstrumentViewSet, 'instruments')
router.register('api/songs', SongViewSet, 'songs')
router.register('api/sections', SectionViewSet, 'sections')
router.register('api/files', FileViewSet, 'files')


urlpatterns = [path('api/auth', include('knox.urls')),
               path('api/auth/register', RegisterAPI.as_view()),
               path('api/auth/login', LoginAPI.as_view()),
               path('api/auth/logout', knox_views.LogoutView.as_view(),
                    name="knox_logout"),
               path('api/auth/user', UserAPI.as_view()),
               path('api/auth/user/edit/<int:pk>/',
                    UpdateProfileView.as_view(), name='auth_update_profile'),
               path('api/auth/user/delete/<int:pk>/', DeleteUser.as_view()),
               path('api/auth/user/passwordreset/<int:pk>/',
                    ChangePasswordView.as_view(), name='auth_change_password'),
               path(
    "api/spotify/callback", views.SpotifyCallbackView.as_view(), name="spotify callback"
),
    path('api/spotify/login/<int:user_id>', views.SpotifyLoginView.as_view(),
         name="spotify login"),



] + router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
