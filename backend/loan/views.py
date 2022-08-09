from datetime import datetime

from c2c.send_email import send_email
from dateutil.relativedelta import relativedelta
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import User

from .models import *
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
                serializer = LoanSerializer(self.get_queryset().filter(~Q(applied_by=request.user)&Q(is_approved=False)), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = LoanCreateSerializer(data=request.data)
            if serializer.is_valid():
                applied_by = User.objects.get(id=serializer.data.get('applied_by'))
                if(applied_by.debt_limit_remaining() >= serializer.data.get('amount')):
                    Loan.objects.create(
                        amount=serializer.data.get('amount'),
                        tenure=serializer.data.get('tenure'),
                        interest=serializer.data.get('interest'),
                        applied_by=applied_by
                    )
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
                return Response(data="Loan Limit exceeded", status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoansBid(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, loan_id):
        try:
            bids_by_user = Loan.objects.get(id=loan_id).bids.all().filter(offered_by=request.user)
            serializer = LoanRequestSerializer(bids_by_user, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)

    def post(self, request, loan_id):
        try:
            user_bidded = User.objects.get(email=request.data.get('email'))
            loan_request = LoanBid.objects.create(
                offered_interest = request.data.get('offered_interest'),
                tenure = int(request.data.get('tenure')),
                offered_by = user_bidded
            )
            try:
                loan = Loan.objects.get(id=loan_id)
                loan.bids.add(loan_request)
                loan_request.amount_to_pay = loan_request.amount_to_be_paid(loan.amount)
                loan_request.save()
                user_name = f"{loan.applied_by.first_name} {loan.applied_by.last_name}"
                mail_content = {
                    "name": user_name,
                    "amount": loan.amount
                }
                send_email("tanmayraj292000@gmail.com", user_name, 'bid_notification', mail_content)
                user_bidded_name = f"{loan_request.offered_by.first_name} {loan_request.offered_by.last_name}"
                mail_content = {
                    "name": user_bidded_name,
                    "borrower": user_name,
                    "amount": loan.amount,
                    "tenure": loan_request.tenure,
                    "interest": loan_request.offered_interest
                }
                send_email("tanmayraj29.99@gmail.com",  user_bidded_name, 'confirm_bid', mail_content)
            except Exception as e:
                print(e)
                loan_request.delete()
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoansBidConfirm(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, loan_id):
        try:
            loan_request = LoanBid.objects.get(id=request.data.get('loan_request_id'))
            loan = Loan.objects.get(id=loan_id)
            if loan.applied_by == request.user and loan.is_approved == False:
                loan.loan_approved_date = datetime.now()
                loan.loan_repayment_date = datetime.now()+relativedelta(months=+loan.tenure)
                loan.is_approved = True
                loan.is_ready_to_pay = True
                loan.loan_bid_accepted = loan_request
                loan.approved_by = loan_request.offered_by
                loan.bids.all().update(status=LoanBid.LoanBidStatus.REJECTED)
                loan.save()
                loan_request.status = LoanBid.LoanBidStatus.APPROVED
                loan_request.save()
                user_name = f"{loan.applied_by.first_name} {loan.applied_by.last_name}"
                user_bidded_name = f"{loan_request.offered_by.first_name} {loan_request.offered_by.last_name}"
                mail_content = {
                    "name": user_bidded_name,
                    "borrower": user_name,
                    "amount": loan.amount,
                    "tenure": loan_request.tenure,
                    "interest": loan_request.offered_interest,
                    "link": "www.google.com"
                }
                send_email("tanmayraj29.99@gmail.com",  user_bidded_name, 'confirm_pay', mail_content)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetLoan(generics.ListCreateAPIView):

    def get(self, request, loan_id):
        try:
            loan = Loan.objects.get(id=loan_id)
            serializer = LoanSerializer(loan)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)
