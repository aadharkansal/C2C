from turtle import ondrag
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.conf import settings
from document.models import Document


# Create your models here.

class UserBankData(models.Model):
    account_no = models.IntegerField(blank=False, unique=True , validators=[MaxLengthValidator(10),MinLengthValidator(10)])
    bank_name = models.CharField(max_length=255, blank=False)
    bank_code = models.IntegerField(blank=False, validators=[MaxLengthValidator(4),MinLengthValidator(4)])
    bank_address = models.TextField(blank=False)

    def __str__(self):
        return self.account_no


class UserDocuments(models.Model):
    aadhaar_card = models.ForeignKey(Document, on_delete=models.CASCADE, blank=False, related_name='user_aadhaar')
    pan_card = models.ForeignKey(Document, on_delete=models.CASCADE, blank=False, related_name='user_pan')
    salary_slips = models.ManyToManyField(Document, blank=False, related_name='user_salaryslips')
    user_bank_info = models.ForeignKey(UserBankData, on_delete=models.CASCADE, blank=False, related_name='user_bank_details')
    ctc = models.IntegerField(blank=False)


class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if email is None:
            raise TypeError("Email not entered.")
        user_obj = self.model(username=username, first_name=first_name, last_name=last_name, email=email)
        user_obj.set_password(password)
        user_obj.is_active = True
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, first_name, last_name, username, email, password=None):
        if password is None:
            raise TypeError("Password not entered.")
        user_obj = self.create_user(first_name, last_name, username, email, password)
        user_obj.is_superuser = True
        user_obj.is_staff = True
        user_obj.is_active = True
        user_obj.save(using=self._db)
        return user_obj
    

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length = 255, unique = True, db_index = True)
    username = models.CharField(max_length = 255, unique = True, null=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    profile_photo = models.ImageField(upload_to='uploads/profile_photos/', blank=True)
    user_bank_data = models.ForeignKey(UserBankData, null=True, blank=True, on_delete=models.CASCADE, related_name='user_bank_data')
    user_documents = models.ForeignKey(UserDocuments, null=True, blank=True, on_delete=models.CASCADE, related_name='user_documents')
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    objects = UserManager()

    class Meta:
        db_table='user'

    def __str__(self):
        return self.email

    def token(self):
        refresh = RefreshToken.for_user(self)
        return str(refresh.access_token)
