from django.db import models
from django.utils.translation import gettext_lazy as _


class FrameType(models.TextChoices):
    TEXT = "text", _("Text")
    IMAGE = "image", _("Image")
