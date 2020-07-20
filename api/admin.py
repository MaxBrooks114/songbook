from django.contrib import admin
from .models import Instrument
from .models import Song
from .models import Element
from .models import File


# Register your models here.
admin.site.register(Instrument)
admin.site.register(Song)
admin.site.register(Element)
admin.site.register(File)
