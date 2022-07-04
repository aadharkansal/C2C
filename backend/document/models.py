from django.db import models

# Create your models here.

class Document(models.Model):
    number = models.CharField(max_length=25, blank=False)
    image = models.ImageField(upload_to='uploads/documents/', blank=False)
