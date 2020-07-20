from .models import Instrument, Song, Element, File
from rest_framework import viewsets
from .serializers import InstrumentSerializer, SongSerializer, ElementSerializer, FileSerializer

# Project Info viewset
# allows us to create a CRUD api without specifying methods for functionality


class InstrumentViewSet(viewsets.ModelViewSet):

    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class SongViewSet(viewsets.ModelViewSet):

    queryset = Song.objects.all()
    serializer_class = SongSerializer


class ElementViewSet(viewsets.ModelViewSet):

    queryset = Element.objects.all()
    serializer_class = ElementSerializer


class FileViewSet(viewsets.ModelViewSet):

    queryset = File.objects.all()
    serializer_class = FileSerializer
