from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Workout, Nutrition

admin.site.register(User, UserAdmin)

# Register models so we can access them in the django backend.
admin.site.register(Profile)
admin.site.register(Workout)
admin.site.register(Nutrition)