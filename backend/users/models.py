from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if email is None:
            raise TypeError("Email not entered.")
        user_obj = self.model(username=username, first_name=first_name, last_name=last_name, email=email)
        user_obj.set_password(password)
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
