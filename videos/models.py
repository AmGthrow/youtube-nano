import os
import uuid

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models

from videos.utils import generate_thumbnail

User = get_user_model()


def validate_file_size(file):
    max_size = 5 * 1024 * 1024  # 5MB in bytes
    if file.size > max_size:
        raise ValidationError(
            f"File size should not exceed 5MB. Current file size is {file.size / (1024 * 1024):.2f}MB."
        )


def validate_video_file_type(file):
    valid_extensions = [".mp4", ".avi", ".mkv", ".webm", ".mov"]
    ext = os.path.splitext(file.name)[1]
    if ext.lower() not in valid_extensions:
        raise ValidationError(
            f"Unsupported file type. Allowed types are: {', '.join(valid_extensions)}."
        )


class Video(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video_file = models.FileField(
        upload_to="videos/",
        validators=[validate_file_size, validate_video_file_type],
    )
    thumbnail_file = models.ImageField(
        upload_to="thumbnails/",
        blank=True,
    )
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.PositiveIntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Video must be saved first so video and thumbnail have same filename
        super().save(*args, **kwargs)

        # If thumbnail_file is not already set, generate the thumbnail
        if self.video_file and not self.thumbnail_file:
            self.thumbnail_file = generate_thumbnail(self.video_file)
            super().save(update_fields=["thumbnail_file"])
