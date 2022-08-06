from django.db import models
from users.models import User
import uuid

# Create your models here.
class LoanBid(models.Model):
    class LoanBidStatus(models.TextChoices):
        PENDING = 'Pending'
        REJECTED = 'Rejected'
        APPROVED = 'Approved'

    offered_interest = models.FloatField(blank=False)
    tenure = models.IntegerField(blank=False, null=True)
    offered_by = models.ForeignKey(User, blank=False, on_delete=models.PROTECT, related_name='loan_offered_by')
    status = models.CharField(max_length=15, choices=LoanBidStatus.choices, default=LoanBidStatus.PENDING)
    amount_to_pay = models.FloatField(blank=True, null=True)

    def amount_to_be_paid(self, amount):
        return round(amount * (1 + self.offered_interest / 1200) ** self.tenure, 2)


class Loan(models.Model):

    class LoanStatus(models.TextChoices):
        PENDING = 'Pending'
        IN_REVIEW = 'In_Review'
        REJECTED = 'Rejected'
        APPROVED = 'Approved'

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length=100, blank=True, null=True)
    amount = models.BigIntegerField(blank=False)
    applied_by = models.ForeignKey(User, blank=False, on_delete=models.CASCADE, related_name='loan_applied_by')
    tenure = models.IntegerField(blank=False)
    interest = models.FloatField(blank=False)
    is_approved = models.BooleanField(default=False)
    approved_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT, related_name='loan_approved_by')
    bids = models.ManyToManyField(LoanBid, blank=True, related_name='loan_bids')
    loan_bid_accepted = models.ForeignKey(LoanBid, blank=True, null=True, on_delete=models.CASCADE, related_name='loan_bid_accepted')
    loan_approved_date = models.DateTimeField(blank=True, null=True)
    is_loan_repaid = models.BooleanField(default=False)
    loan_repayment_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=LoanStatus.choices, default=LoanStatus.IN_REVIEW)

    def __str__(self):
        return f'{self.applied_by}-{self.amount}-{self.amount}'
