from core.models import Frame, FrameImage, Memory
from rest_framework import serializers


class FrameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrameImage
        fields = ("uuid", "image", "caption", "alt_text")
        read_only_fields = ("uuid",)


class FrameSerializer(serializers.ModelSerializer):
    images = FrameImageSerializer(many=True, read_only=False)

    class Meta:
        model = Frame
        fields = ("uuid", "type", "prompt", "content", "images")
        read_only_fields = ("uuid",)

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        frame = Frame.objects.create(**validated_data)

        # Create new FrameImage instances
        for image_data in images_data:
            FrameImage.objects.create(frame=frame, **image_data)

        return frame

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", [])

        # Update frame fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Delete all existing images
        instance.images.all().delete()

        # Create new FrameImage instances
        for image_data in images_data:
            FrameImage.objects.create(frame=instance, **image_data)

        return instance


class MemorySerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=255, allow_blank=True, allow_null=True, write_only=True
    )
    frames = FrameSerializer(many=True, read_only=True)

    class Meta:
        model = Memory
        fields = (
            "uuid",
            "title",
            "description",
            "is_public",
            "password",
            "frames",
            "created_at",
        )
        read_only_fields = ("uuid", "frames")
        write_only_fields = "password"


class SummarySerializer(serializers.Serializer):
    summary = serializers.CharField()
