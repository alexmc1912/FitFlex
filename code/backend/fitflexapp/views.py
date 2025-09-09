from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, ProfileSerializer, WorkoutSerializer, NutritionSerializer
from .models import Profile, Workout, Nutrition
from rest_framework.parsers import MultiPartParser, FormParser
import requests
from django.conf import settings

# This model creates a new user and returns an authentication token.
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() # Saves new user instance.
            token, created = Token.objects.get_or_create(user=user) # This line is important and creates our authentication token.
            return Response(
                {"message": "User created successfully!", "token": token.key},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# This is an API endpoint for a user login, authenticate user credentials and return an authentication token.
class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs) # This line calls default ObtainAuthToken logic.
        token = Token.objects.get(key=response.data["token"])
        return Response({"token": token.key, "username": token.user.username})

# This is the logout endpoint which also deletes authentication tokens.
class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete() # Removes the token from our database.
        logout(request) # Logs out the user from the current session.
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

# This API endpoint creates a user profile, ensures each user only has 1 profile, saves profile data, as well as handle profile picture uploads. 
class CreateProfileView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # This post request checks if the user already has a profile.
    def post(self, request):
        if hasattr(request.user, "profile"):
            return Response(
                {"error": "Profile already exists for this user."},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = request.data.copy()
        data["user"] = request.user.id # This line associates the profile with the logged in user.

        serializer = ProfileSerializer(data=data)

        # If our user is uploading a profile picture, here is where we will save it.
        if serializer.is_valid():
            profile = serializer.save(user=request.user)

            if "profile_picture" in request.FILES:
                profile.profile_picture = request.FILES["profile_picture"]
                profile.save()

            return Response(
                {"message": "Profile created successfully!", "profile": serializer.data},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# This is our endpoint for viewing and updating a user profile.
class ProfileDetailView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser) # This line allows for file uploads. 

    # Retrieve logged in users profile information with this get request.
    def get(self, request):
        try:
            profile = request.user.profile
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"message": "No profile found, please create one."}, status=status.HTTP_404_NOT_FOUND)

    # This function updates the users profile, including the profile picture along with other details.
    def put(self, request):
        try:
            profile = request.user.profile
            data = request.data.copy()

            serializer = ProfileSerializer(profile, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

                # This if statement handles profile picture updates.
                if "profile_picture" in request.FILES:
                    profile.profile_picture = request.FILES["profile_picture"]
                    profile.save()

                return Response({"message": "Profile updated successfully!", "profile": serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

# This API endpoint is used for our working generation. We retrieve user workout history with GET, use POST to add a new plan, as well as delete specific workouts.
class WorkoutTrackingView(APIView):
    # Users must be logged in and authenticated
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # Had to map specific muscles into high level muscle groups to make user interaction with system easier.
    MUSCLE_GROUP_MAPPING = {
        "Arms": ["biceps", "triceps", "forearms"],
        "Legs": ["quadriceps", "hamstrings", "calves", "glutes"],
        "Back": ["lats", "lower_back", "middle_back", "traps"],
        "Chest": ["chest"],
        "Core": ["abdominals"],
        "Shoulders": ["traps"],
    }

    # This function fetches exercise recommendations from NINJA API using parameters from above and lists exercise recommendations.
    def fetch_exercises_from_api(self, muscle):
        api_url = "https://api.api-ninjas.com/v1/exercises"
        headers = {"X-Api-Key": settings.NINJA_API_KEY} # API key comes from settings for authentication.
        params = {"muscle": muscle.lower()} # Convert muscle names to lower case to interact properly with API.

        response = requests.get(api_url, headers=headers, params=params)

        # Debugging code used to log response status.
        print(f"Fetching exercises for {muscle}: {response.status_code}")
        if response.status_code == 200:
            return response.json() # Returns a JSON response if the request is a success.
        return [] # Empty list returned if request fails.
    
    # This function fetches all workouts that the current logged in user has under their username.
    def get(self, request):
        user = request.user
        workouts = Workout.objects.filter(user=user)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response({"workouts": serializer.data}, status=status.HTTP_200_OK)

    # This function saves the new workout for a user in database. 
    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id  

        workout_plan = {}

        # This for loop goes through each workout day and its associated muscle group.
        for day, muscle_group in data.get("workout_plan", {}).items():
            if not isinstance(muscle_group, list):
                muscle_group = [muscle_group]
            
            # If it's a rest day or empty store rest day. 
            if "Rest" in muscle_group or not muscle_group:
                workout_plan[day] = {"muscle": "Rest", "exercises": []}
                continue

            # List that stores recommended exercises.
            all_exercises = []

            # Fetches exercises for each muscle group, making use of MUSCLE_GROUP_MAPPING.
            for muscle in muscle_group:
                api_muscles = self.MUSCLE_GROUP_MAPPING.get(muscle, [muscle])  
                for api_muscle in api_muscles:
                    exercises = self.fetch_exercises_from_api(api_muscle)
                    if exercises:
                        all_exercises.extend(exercises)

            # Limit exercises to 8 per day. Had trouble with keeping a regular amount.
            all_exercises = all_exercises[:8]

            # Add default reps and sets.
            for exercise in all_exercises:
                exercise.setdefault("sets", "3 sets of 8-12 reps")  
                exercise.setdefault("reps", "8-12")

            # Final structured workout plan for current day.
            workout_plan[day] = {
                "muscle": ", ".join(muscle_group),  
                "exercises": all_exercises
            }

        data["workout_plan"] = workout_plan # Update request data with structured data.

        serializer = WorkoutSerializer(data=data) # Validate and serialize data here.
        if serializer.is_valid():
            serializer.save() # Workout saves to the SQL database.
            return Response(
                {"message": "Workout added successfully, congratulation!", "workout": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # This function deletes a workout for a user, giving them a reponse confirming the deletion.
    def delete(self, request, workout_id):
        try:
            workout = Workout.objects.get(id=workout_id, user=request.user) # Finds the workout that matches the provided ID.
            workout.delete()
            return Response({"message": "Workout deleted successfully!"}, status=status.HTTP_200_OK)
        except Workout.DoesNotExist:
            return Response({"error": "Workout couldn't be found"}, status=status.HTTP_404_NOT_FOUND)

# This is an API endpoint for tracking nutrition.
class NutritionTrackingView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # This GET request function retrieves the nutrition records of logged in users.
    def get(self, request):
        nutrition_data = Nutrition.objects.filter(user=request.user)
        serializer = NutritionSerializer(nutrition_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # This adds a new nutrition
    def post(self, request):
        serializer = NutritionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Nutrition entry added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)