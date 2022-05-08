from rest_framework.exceptions import AuthenticationFailed
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import *
from .models import User


class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            serializer.is_valid(raise_exception = True)
            
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception:
            raise AuthenticationFailed("Invalid credentials. Try Again...")


class Register(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            try:
                serializer.is_valid(raise_exception = True)
                user = User.objects.create_user(
                    first_name = request.data.get('first_name'),
                    last_name = request.data.get('last_name'),
                    username = request.data.get('email'),
                    email = request.data.get('email'),
                    password = request.data.get('password'),
                )
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            except Exception:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            raise ValidationError("Invalid data. Try Again...")
