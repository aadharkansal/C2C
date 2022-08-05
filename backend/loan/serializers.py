from rest_framework import serializers

from .models import Loan, LoanBid

from users.serializers import UserListSerializer


class LoanRequestSerializer(serializers.ModelSerializer):
    offered_by = UserListSerializer()
    class Meta:
        model = LoanBid
        fields = ["offered_interest", "tenure", "offered_by", "id"]

class LoanSerializer(serializers.ModelSerializer):
    applied_by = UserListSerializer()
    approved_by = UserListSerializer()
    bids = LoanRequestSerializer(many=True)
    class Meta:
        model = Loan
        fields = ["id", "type", "amount", "applied_by", "tenure", 
                    "interest", "is_approved", "approved_by", "bids"]


class LoanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["amount", "tenure", "interest", "applied_by"]


class LoanBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanBid
        fields = ["offered_interest", "tenure", "email"]