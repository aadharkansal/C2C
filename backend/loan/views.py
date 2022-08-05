from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import User

from .models import Loan
from .serializers import *


class Loans(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            if self.request.query_params.get('applied'):
                serializer = LoanSerializer(self.get_queryset().filter(applied_by=request.user), many=True)
            elif self.request.query_params.get('approved'):
                serializer = LoanSerializer(self.get_queryset().filter(approved_by=request.user), many=True)
            else:
                serializer = LoanSerializer(self.get_queryset(), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = LoanCreateSerializer(data=request.data)
            if serializer.is_valid():
                applied_by = User.objects.get(id=serializer.data.get('applied_by'))
                loan = Loan.objects.create(
                    amount=serializer.data.get('amount'),
                    tenure=serializer.data.get('tenure'),
                    interest=serializer.data.get('interest'),
                    applied_by=applied_by
                )
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoansBid(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, loan_id):
        try:
            user_bidded = User.objects.get(email=request.data.get('email'))
            print(user_bidded, "AD")
            loan_request = LoanRequest.objects.create(
                offered_interest = request.data.get('offered_interest'),
                tenure = request.data.get('tenure'),
                offered_by = user_bidded
            )
            try:
                Loan.objects.get(id=loan_id).requests.add(loan_request)
            except Exception as e:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoansBidConfirm(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, loan_id):
        try:
            loan_request = LoanRequest.objects.get(id=request.data.get('loan_request_id'))
            loan = Loan.objects.get(id=loan_id)
            if loan.applied_by == request.user and loan.is_approved == False:
                loan.is_approved = True
                loan.loan_request_accepted = loan_request
                loan.approved_by = loan_request.offered_by
                loan.save()
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
