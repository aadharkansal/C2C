import uuid

from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.db.models import Q
from loan.models import *
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.


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
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    email = models.EmailField(max_length = 255, unique = True, db_index = True)
    username = models.CharField(max_length = 255, unique = True, null=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    salary = models.BigIntegerField(blank=False)
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

    def total_loan_given(self):
        loans = Loan.objects.filter(Q(is_approved=self.id)&Q(is_approved=True))
        total_loan_amount = 0
        for loan in loans:
            total_loan_amount += loan.amount
        return total_loan_amount
    
    def total_loan_taken(self):
        loans = Loan.objects.filter(Q(is_applied=self.id)&Q(is_approved=True))
        total_loan_amount = 0
        for loan in loans:
            total_loan_amount += loan.amount
        return total_loan_amount
    
    def max_credit_limit(self):
        return self.salary/5

    def debt_limit_remaining(self):
        loans = Loan.objects.filter(Q(applied_by=self.id)&Q(is_approved=True))
        total_remaining = 0
        for loan in loans:
            total_remaining += loan.loan_bid_accepted.amount_to_pay
        return self.max_credit_limit()-total_remaining

