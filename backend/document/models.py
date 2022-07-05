from django.db import models
import uuid

# Create your models here.

class Document(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    number = models.CharField(max_length=25, blank=False)
    image = models.ImageField(upload_to='uploads/documents/', blank=False)
