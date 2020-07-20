from django.contrib import admin
from django.urls import path
from rest_framework import routers
from .api import InstrumentViewSet, SongViewSet, ElementViewSet

router = routers.DefaultRouter()
router.register('api/instruments', InstrumentViewSet)
router.register('api/songs', SongViewSet)
router.register('api/elements', ElementViewSet)

urlpatterns = router.urls
