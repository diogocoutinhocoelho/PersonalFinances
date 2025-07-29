from django.urls import path, include
from rest_framework.routers import DefaultRouter
from finances.views import TransactionViewSet, GoalViewSet, CurrencyConversionView


router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
]
urlpatterns += [
    path('convert/', CurrencyConversionView.as_view(), name='currency-convert'),
]
