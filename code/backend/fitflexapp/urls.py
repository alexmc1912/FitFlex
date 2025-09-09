from django.urls import path
from .views import SignupView, LoginView, CreateProfileView, WorkoutTrackingView, NutritionTrackingView, ProfileDetailView

# URL patterns for API endpoints.
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'), # Used for user registration.
    path('login/', LoginView.as_view(), name='login'), # Used for user login.
    path('create-profile/', CreateProfileView.as_view(), name='create_profile'), # This endpoint is used for creating a user profile.
    path('workouts/', WorkoutTrackingView.as_view(), name='workout_tracking'), # This endpoint is used for viewing and adding workouts.
    path('workouts/<int:workout_id>/', WorkoutTrackingView.as_view(), name='delete_workout'), # Used for deleting a workout.
    path('nutrition-tracking/', NutritionTrackingView.as_view(), name='nutrition_tracking'), # This manages nutrition data.
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"), # Endpoint here used for view and update profile.
]
