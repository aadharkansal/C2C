from rest_framework import serializers

from .models import Loan, LoanRequest

from users.serializers import UserListSerializer, UserSerializer


class LoanSerializer(serializers.ModelSerializer):
    applied_by = UserListSerializer()
    approved_by = UserListSerializer()
    class Meta:
        model = Loan
        fields = ["id", "type", "amount", "applied_by", "tenure", "interest", "is_approved", "approved_by"]


class LoanBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ["offered_interest", "tenure", "offered_by"]