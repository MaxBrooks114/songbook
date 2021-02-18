from django.contrib import admin
from django.contrib.auth.models import User
from .models import Instrument
from .models import Song
from .models import Section
from .models import File


# Register your models here.

admin.site.register(Instrument)
admin.site.register(Song)
admin.site.register(Section)
admin.site.register(File)
