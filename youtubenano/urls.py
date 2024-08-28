from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from frontend import views as frontend_views
from videos.views import VideoViewSet

from .settings import base as settings

router = DefaultRouter()
router.register(r"videos", VideoViewSet, basename="videos")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/api-auth/", include("rest_framework.urls")),
    path("api/v1/", include(router.urls)),
    re_path(r"^(?P<path>.*)/$", frontend_views.index),
    path("", frontend_views.index),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Swagger docs configuration
    from drf_yasg import openapi
    from drf_yasg.views import get_schema_view
    from rest_framework import permissions

    schema_view = get_schema_view(
        openapi.Info(
            title="Youtube Nano API",
            default_version="v1",
            description="API Documentation for https://github.com/AmGthrow/youtube-nano",
        ),
        public=True,
        permission_classes=[permissions.AllowAny],
    )

    # API Documentation
    urlpatterns.append(
        re_path(
            r"^api/v1/docs/swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        )
    )
    urlpatterns.append(
        path(
            "api/v1/docs/swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
    )
    urlpatterns.append(
        path(
            "api/v1/docs/redoc/",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        )
    )
