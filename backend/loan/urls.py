from django.urls import path
from .views import *

urlpatterns = [
    path('', Loans.as_view()),
    path('<uuid:loan_id>', GetLoan.as_view()),
    path('bid/<uuid:loan_id>', LoansBid.as_view()),
    path('bid/<uuid:loan_id>/confirm', LoansBidConfirm.as_view()),
]