from django.urls import path
from .views import FoodList

urlpatterns = [
    path('foods/', FoodList.as_view()),
]
