from rest_framework import serializers
from .models import User, Profile, Workout, Nutrition

# Serializer for User model.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}} # This line ensures there is not a password returned in an api response.

    # This function creates a method to has passwords properly
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

# Serializer for our Profile model.
class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False) # Allows a user to continue without needing a profile picture should they not want to add one.

    class Meta:
        model = Profile
        fields = ["full_name", "age", "weight", "profile_picture"]

# Serializer for our Workout Model.
class WorkoutSerializer(serializers.ModelSerializer):
    workout_plan = serializers.JSONField() # This line stores our workout plans in JSON format.

    class Meta:
        model = Workout
        fields = ["id", "user", "created_at", "muscle_groups", "workout_plan", "notes"]

#Serializer for our Nutrition Model.
class NutritionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrition
        fields = ["user", "date", "meal_type", "calories", "protein", "carbs", "fats", "notes"]
