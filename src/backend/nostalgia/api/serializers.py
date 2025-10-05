from core.models import Frame, FrameImage, Memory
from rest_framework import serializers


class FrameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrameImage
        fields = ("uuid", "image", "caption", "alt_text")
        read_only_fields = ("uuid",)


class FrameSerializer(serializers.ModelSerializer):
    images = FrameImageSerializer(many=True, read_only=True)

    class Meta:
        model = Frame
        fields = ("uuid", "type", "prompt", "content", "order", "images")
        read_only_fields = ("uuid",)


class MemorySerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=255, allow_blank=True, allow_null=True, write_only=True
    )
    frames = serializers.SlugRelatedField(many=True, read_only=True, slug_field="uuid")

    class Meta:
        model = Memory
        fields = (
            "uuid",
            "user_id",
            "slug",
            "title",
            "description",
            "is_public",
            "password",
            "frames",
            "created_at",
        )
        read_only_fields = ("uuid", "frames")
        write_only_fields = ("password", "user_id")
