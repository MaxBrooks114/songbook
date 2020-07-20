from django.db import models
from django.utils import timezone
from django.conf import settings
# Create your models here.


class Instrument(models.Model):
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    family = models.CharField(max_length=200)
    tonal_range = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    year = models.CharField(max_length=4)
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
