from core.models import Frame, Memory
from rest_framework import serializers


class FrameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frame
        fields = ["uuid", "type", "prompt", "content", "order"]
        read_only_fields = ["uuid"]


class MemorySerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=255, allow_blank=True, allow_null=True, write_only=True
    )
    frames = FrameSerializer(many=True, read_only=True)

    class Meta:
        model = Memory
        fields = [
            "uuid",
            "slug",
            "title",
            "description",
            "is_public",
            "password",
            "frames",
        ]
        read_only_fields = ["uuid", "frames"]
        write_only_fields = ["password"]
