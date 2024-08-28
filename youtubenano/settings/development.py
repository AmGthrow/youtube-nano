from youtubenano.settings.base import *  # NOQA
from youtubenano.settings.base import env

INSTALLED_APPS.append("drf_yasg")

# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="!!!SET DJANGO_SECRET_KEY!!!",
)
CORS_ALLOW_ALL_ORIGINS = True
ALLOWED_HOSTS = ["*"]
INTERNAL_IPS = ["127.0.0.1"]
