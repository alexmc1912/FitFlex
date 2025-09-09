from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import JSONField

# Customer user model here to extend django's default AbstractUser.
class User(AbstractUser):
    email = models.EmailField(unique=True) # Ensures unique email for each user.

    def __str__(self):
        return self.username # This returns the username as a string representation.

# This model is used for profile creation which has a one-to-one relationship with User.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    full_name = models.CharField(max_length=100)
    age = models.IntegerField()
    weight = models.FloatField()
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)

    def __str__(self):
        return self.user.username # This line returns te associated username.

# This is the model that will be used for workout tracking.
class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workouts")
    created_at = models.DateTimeField(auto_now_add=True)
    muscle_groups = models.CharField(max_length=255)
    workout_plan = models.JSONField() # Detailed workout plan in the JSON format.
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Workout Plan {self.created_at.date()} by {self.user.username}"

# Nutrition tracking model.
class Nutrition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="nutrition")
    date = models.DateField()
    meal_type = models.CharField(max_length=100) # Meal types such as breakfast, lunch and dinner.
    calories = models.PositiveIntegerField()
    protein = models.FloatField(blank=True, null=True)
    carbs = models.FloatField(blank=True, null=True)
    fats = models.FloatField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.meal_type} on {self.date} by {self.user.username}"
