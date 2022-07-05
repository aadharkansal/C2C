from django.urls import path
from .views import *

urlpatterns = [
    path('', Loans.as_view()),
]