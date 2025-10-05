from api.serializers import MemorySerializer
from core.models import Memory
from rest_framework import viewsets


class MemoryViewSet(viewsets.ModelViewSet):
    queryset = Memory.objects.all().select_related("frames")
    serializer_class = MemorySerializer
    lookup_field = "uuid"
