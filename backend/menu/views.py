from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Food
from .serializers import FoodSerializer

class FoodList(APIView):
    def get(self, request):
        foods = Food.objects.all()
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)
