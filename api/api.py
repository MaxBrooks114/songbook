from .models import Instrument, Song, Element, File
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.views.decorators.csrf import csrf_protect
from .serializers import InstrumentSerializer, SongSerializer, ElementSerializer, FileSerializer, UserSerializer, RegisterSerializer, LoginSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class InstrumentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = InstrumentSerializer

    def get_queryset(self):
        return self.request.user.instruments.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SongViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = SongSerializer

    def get_queryset(self):
        return self.request.user.songs.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ElementViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ElementSerializer

    def get_queryset(self):
        return self.request.user.elements.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FileSerializer

    def get_queryset(self):
        return self.request.user.songs.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
