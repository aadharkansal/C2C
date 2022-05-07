from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator

# Create your models here.

class UserBankData(models.Model):
    account_no = models.IntegerField(blank=False, validators=[MaxLengthValidator(10),MinLengthValidator(10)])
    bank_name = models.CharField(max_length=255, blank=False)
    bank_code = models.IntegerField(blank=False, validators=[MaxLengthValidator(4),MinLengthValidator(4)])
    bank_address = models.TextField(blank=False)

    def __str__(self):
        return self.account_no


class Document(models.Model):
    number = models.CharField(max_length=25, blank=False)
    image = models.ImageField(upload_to='uploads/documents/', blank=False)


class UserData(models.Model):
    aadhaar_card = models.ForeignKey(Document, on_delete=models.CASCADE, blank=False, related_name='user_aadhaar')
    pan_card = models.ForeignKey(Document, on_delete=models.CASCADE, blank=False, related_name='user_pan')
    salary_slips = models.ManyToManyField(Document, blank=False, related_name='user_salaryslips')
    user_bank_info = models.ForeignKey(UserBankData, on_delete=models.CASCADE, blank=False, related_name='user_bank_details')
    ctc = models.IntegerField(blank=False)
