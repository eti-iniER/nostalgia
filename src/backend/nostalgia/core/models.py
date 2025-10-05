# Create your models here.

from uuid import uuid4

from core.enums import FrameType
from django.db import models


class BaseModel(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Memory(BaseModel):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_public = models.BooleanField(default=True)
    password = models.CharField(max_length=255, blank=True, null=True)


class Frame(BaseModel):
    memory = models.ForeignKey(Memory, related_name="frames", on_delete=models.CASCADE)
    type = models.CharField(
        max_length=10, choices=FrameType.choices, default=FrameType.TEXT
    )
    prompt = models.TextField()
    content = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(null=True)

    class Meta:
        ordering = ["order"]
