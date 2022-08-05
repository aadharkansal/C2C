from rest_framework import serializers
from users.serializers import UserListSerializer

from .models import Loan, LoanBid


class LoanRequestSerializer(serializers.ModelSerializer):
    offered_by = UserListSerializer()
    class Meta:
        model = LoanBid
        fields = ["id", "offered_interest", "tenure", "offered_by", "status", "amount_to_pay"]


class LoanSerializer(serializers.ModelSerializer):
    applied_by = UserListSerializer()
    approved_by = UserListSerializer()
    bids = LoanRequestSerializer(many=True)
    loan_bid_accepted = LoanRequestSerializer()
    class Meta:
        model = Loan
        fields = ["id", "type", "amount", "applied_by", "tenure",
                    "interest", "is_approved", "approved_by", "bids", "loan_approved_date", "loan_repayment_date", "loan_bid_accepted"]


class LoanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["amount", "tenure", "interest", "applied_by"]


class LoanBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanBid
        fields = ["offered_interest", "tenure", "email"]
