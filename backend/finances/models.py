from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Transaction(models.Model):
    TYPE_CHOICES = (
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    category = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=(('entrada', 'Entrada'), ('saida', 'Saída')))
    date = models.DateField(default=timezone.now)
    description = models.TextField(blank=True)

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_value = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    final_date = models.DateField()

