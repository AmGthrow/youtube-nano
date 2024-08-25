import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from frontend import views as frontend_views
from videos.views import VideoViewSet

router = DefaultRouter()
router.register(r"videos", VideoViewSet, basename="videos")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("", frontend_views.index),
]

if settings.DEBUG:
    urlpatterns += [static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)]
