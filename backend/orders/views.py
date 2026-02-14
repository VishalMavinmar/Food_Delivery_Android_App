from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Order, OrderItem
from menu.models import Food


# ======================
# CREATE ORDER
# ======================
class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        phone = request.data.get("phone")
        address = request.data.get("address")
        notes = request.data.get("notes", "")
        items = request.data.get("items", [])

        if not phone or not address or not items:
            return Response(
                {"error": "Phone, address and items are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = Order.objects.create(
            user=request.user,
            phone=phone,
            address=address,
            notes=notes,
        )

        for item in items:
            food = Food.objects.get(id=item["food"])
            OrderItem.objects.create(
                order=order,
                food=food,
                quantity=item["quantity"],
            )

        return Response(
            {"message": "Order placed successfully"},
            status=status.HTTP_201_CREATED,
        )


# ======================
# ORDER HISTORY
# ======================
class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")

        data = []
        for order in orders:
            items = []
            for item in order.orderitem_set.all():
                items.append({
                    "food": item.food.name,
                    "quantity": item.quantity,
                    "price": item.food.price,
                })

            data.append({
                "id": order.id,
                "phone": order.phone,
                "address": order.address,
                "created_at": order.created_at,
                "items": items,
            })

        return Response(data)
