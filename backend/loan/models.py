from django.db import models
from users.models import User
import uuid

# Create your models here.

class Loan(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length=100, blank=True, null=True)
    amount = models.BigIntegerField(blank=False)
    applied_by = models.ForeignKey(User, blank=False, on_delete=models.CASCADE, related_name='loan_applied_by')
    tenure = models.IntegerField(blank=False)
    interest = models.FloatField(blank=False)
    is_approved = models.BooleanField(default=False)
    approved_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT, related_name='loan_approved_by')

    def __str__(self):
        return f'{self.applied_by}-{self.type}'
    