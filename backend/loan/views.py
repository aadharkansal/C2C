from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import Loan


class Loans(generics.ListAPIView):
    queryset = Loan.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer

    def get(self, request):
        try:
            if self.request.query_params.get('applied_by_user'):
                serializer = LoanSerializer(self.get_queryset().filter(applied_by=request.user), many=True)
            elif self.request.query_params.get('approved_by_user'):
                serializer = LoanSerializer(self.get_queryset().filter(approved_by=request.user), many=True)
            else:
                serializer = LoanSerializer(self.get_queryset(), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception:
            return Response(data=[], status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = LoanSerializer(data=request.data, many=True)
            print(serializer)
            return Response(status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)