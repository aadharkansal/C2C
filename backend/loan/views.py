from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import Loan
from users.models import User


class Loans(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer

    def get(self, request):
        try:
            if self.request.query_params.get('applied'):
                serializer = LoanSerializer(self.get_queryset().filter(applied_by=request.user), many=True)
            elif self.request.query_params.get('approved'):
                serializer = LoanSerializer(self.get_queryset().filter(approved_by=request.user), many=True)
            else:
                serializer = LoanSerializer(self.get_queryset(), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception:
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = LoanSerializer(data=request.data, many=True)
            return Response(status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoansBid(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LoanBidSerializer

    def post(self, request, loan_id):
        try:
            serializer = LoanBidSerializer(data=request.data)
            if serializer.is_valid():
                user_bidded = User.objects.get(id=serializer.data.get('offered_by'))
                loan_request = LoanRequest.objects.create(
                    offered_interest = serializer.data.get('offered_interest'),
                    tenure = serializer.data.get('tenure'),
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
            if loan.applied_by == request.user:
                loan.loan_request_accepted = loan_request
                loan.save()
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)