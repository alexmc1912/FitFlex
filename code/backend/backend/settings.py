from pathlib import Path
import os
import environ # This library manages environment variables.
from decouple import config # This library is used to retrieve environment variables.

# Base directory of the project.
BASE_DIR = Path(__file__).resolve().parent.parent

# Media settings are used for to allow users to upload their profile photos.
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# These two lines initialise environment variables for our .env file.
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# This is the API key for our workout generator, easy to store in here. Would normally have this stored securely instead of hardcoded.
NINJA_API_KEY = "HM+iqm9lodVE9JEYMyO62g==LsoXBBgnYzqGWLzW"

# Secret key (for development purposes only)
SECRET_KEY = 'django-insecure-replace-with-your-secret-key'

# Debug settings
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = []

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # This is the django rest framework for API's.
    'rest_framework.authtoken', # This is used for our Token-Based Authentication system.
    'corsheaders', # This app handles our Cross-Origin Resource Sharing.
    'fitflexapp', # Our custom django app.
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Root URL configuration
ROOT_URLCONF = 'backend.urls'

# Templates settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application
WSGI_APPLICATION = 'backend.wsgi.application'

# This is our database configuration for our MySQL remote database which uses environmental variables for security.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', cast=int),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom user model which overides regular user model.
AUTH_USER_MODEL = 'fitflexapp.User'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication', # Used for session based authentication.
        'rest_framework.authentication.TokenAuthentication', # Used for our token-based authtication.
    ],
    'DEFAULT_PERMISSION_CLASSES': [],
}
# These CORS settings allow the frontend of our application to interact with the backend securely.
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [ # Specific origins that can access the backend (Used for testing purposes).
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# These are the trusted origins for CSRF protection
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]