from django.contrib import auth
from django.db.models import Q
from loan.models import *
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import User


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        required=True, allow_blank=False, max_length=68, min_length=2, write_only=True
    )

    class Meta:
        model = User
        fields = ["email", "password", "token"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")
        user = auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')

        return {"email": user.email, "token": user.token, "id": user.id}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password"]


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "username"]


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["salary"]

class UserGetSerializer(serializers.ModelSerializer):
    total_loan_given = serializers.SerializerMethodField()
    total_loan_taken = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "username", "total_loan_given", "total_loan_taken", "salary"]

    def get_total_loan_given(self, obj):
        return obj.total_loan_given()
    
    def get_total_loan_taken(self, obj):
        return obj.total_loan_taken()

