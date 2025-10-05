from api.views import FrameViewSet, MemoryViewSet
from django.urls import path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"memories", MemoryViewSet, basename="memory")


urlpatterns = [
    path(
        "schema/",
        SpectacularAPIView.as_view(api_version="v1"),
        name="schema",
    ),
    path(
        "docs/",
        SpectacularSwaggerView.as_view(url_name="api:schema"),
        name="swagger-ui",
    ),
    path(
        "redoc/",
        SpectacularRedocView.as_view(url_name="api:schema"),
        name="redoc",
    ),
    path(
        r"memories/<uuid:memory_uuid>/frames/",
        FrameViewSet.as_view({"get": "list", "post": "create"}),
        name="frame-list",
    ),
]

urlpatterns += router.urls
