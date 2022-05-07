from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404
import datetime
from .serializers import LoginSerializer
from .models import User


class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            serializer.is_valid(raise_exception = True)
            
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK}) 
        
        except Exception:
            raise AuthenticationFailed("Invalid credentials. Try Again...")