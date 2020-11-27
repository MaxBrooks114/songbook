from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from rest_framework import generics, viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework import status

from rest_framework.parsers import MultiPartParser, FormParser
from knox.models import AuthToken
from .models import Instrument, Song, Element, File, SpotifyInfo
from .serializers import SpotifyInfoSerializer, InstrumentSerializer, \
    SongSerializer, ElementSerializer, FileSerializer, UserSerializer, \
    RegisterSerializer, LoginSerializer, UserProfileChangeSerializer


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


class UserIsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id


class UserProfileChangeAPIView(generics.RetrieveAPIView,
                               mixins.DestroyModelMixin,
                               mixins.UpdateModelMixin):
    permission_classes = (
        permissions.IsAuthenticated,
        UserIsOwnerOrReadOnly,
    )
    serializer_class = UserProfileChangeSerializer

    def get_object(self):
        id = self.request.user.id
        obj = get_object_or_404(User, id=id)
        return obj

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(
            request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data['password']:
            user.set_password(serializer.validated_data['password'])
        serializer.save()
        user.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


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
        return self.request.user.files.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
