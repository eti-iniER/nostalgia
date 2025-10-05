from api.serializers import FrameSerializer, MemorySerializer, SummarySerializer
from core.models import Frame, Memory
from core.services.memory import create_new_frame, get_memory_summary
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action


class MemoryViewSet(viewsets.ModelViewSet):
    queryset = Memory.objects.all().select_related("frames")
    serializer_class = MemorySerializer
    lookup_field = "uuid"

    @extend_schema(
        description="Get a summary of the memory using AI",
        responses={status.HTTP_200_OK: SummarySerializer},
    )
    @action(detail=True, methods=["get"], url_path="summary")
    def get_summary(self, request, uuid=None):
        memory = self.get_object()
        summary = get_memory_summary(memory)
        return Response({"summary": summary})

    @extend_schema(
        description="Create a new empty frame for the memory using AI",
        responses={status.HTTP_201_CREATED: FrameSerializer},
    )
    @action(detail=True, methods=["post"], url_path="new-frame")
    def get_new_frame(self, request, uuid=None):
        memory = self.get_object()
        frame = create_new_frame(memory)
        serializer = FrameSerializer(frame)
        return Response(serializer.data)


class FrameViewSet(viewsets.ModelViewSet):
    queryset = Frame.objects.all()
    serializer_class = FrameSerializer
    lookup_field = "uuid"
