from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator

# Create your models here.

class UserBankData(models.Model):
    account_no = models.IntegerField(validators=[MaxLengthValidator(10),MinLengthValidator(10)])
    bank_name = models.CharField(max_length=255)
    bank_code = models.IntegerField(validators=[MaxLengthValidator(4),MinLengthValidator(4)])
    bank_address = models.TextField()

    def __str__(self):
        return self.account_no
