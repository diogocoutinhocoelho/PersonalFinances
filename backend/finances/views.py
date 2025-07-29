from rest_framework import viewsets, permissions, views, status
from rest_framework.response import Response
from finances.models import Transaction, Goal
from finances.serializers import TransactionSerializer, GoalSerializer
from finances.services import ExchangeRatesAPI


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user).order_by('final_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CurrencyConversionView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from_currency = request.query_params.get('from')
        to_currency = request.query_params.get('to')
        amount = request.query_params.get('amount')

        if not all([from_currency, to_currency, amount]):
            return Response({"detail": "Parâmetros 'from', 'to' e 'amount' são obrigatórios."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            converted = ExchangeRatesAPI().convert(
                amount=float(amount),
                from_currency=from_currency.upper(),
                to_currency=to_currency.upper()
            )
            return Response({"result": converted}, status=200)

        except Exception as e:
            return Response({"detail": str(e)}, status=500)
