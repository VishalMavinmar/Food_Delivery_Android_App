from django.db import models
from django.contrib.auth.models import User
from menu.models import Food


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, default="")   # ✅ FIX
    address = models.TextField(default="")                # ✅ FIX
    notes = models.TextField(blank=True, default="")      # ✅ FIX
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)             # ✅ FIX

    def __str__(self):
        return f"{self.food.name} x {self.quantity}"
