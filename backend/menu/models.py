from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    rating = models.FloatField(default=4.5)
    cook_time = models.IntegerField(default=15)

    def __str__(self):
        return self.name
