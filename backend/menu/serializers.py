from rest_framework import serializers
from .models import Food, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Food
        fields = '__all__'
