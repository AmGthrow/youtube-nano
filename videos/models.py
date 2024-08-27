import os
import uuid

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models

from videos.utils import generate_ascii_video, generate_thumbnail

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

    def delete(self, *args, **kwargs):
        # Delete the video and thumbnail files from the file system
        if self.video_file:
            self.video_file.delete(save=False)
        if self.thumbnail_file:
            self.thumbnail_file.delete(save=False)

        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        # If thumbnail_file is not already set, generate the thumbnail
        if self.video_file and not self.thumbnail_file:
            self.thumbnail_file = generate_thumbnail(self.video_file)

        # When creating new video, automatically cover it with an ASCII filter
        if self._state.adding and self.video_file:

            self.video_file, files_to_cleanup = generate_ascii_video(
                self.video_file,
            )
            super().save(*args, **kwargs)
            # WARNING: Temp files must be deleted AFTER Django saves the model.
            # Otherwise Django will be saving nonexistent files.
            files_to_cleanup["temp_video_file"].close()
            os.remove(files_to_cleanup["temp_video_file"].name)
            files_to_cleanup["output_video_file"].close()
            os.remove(files_to_cleanup["output_video_file"].name)
            files_to_cleanup["frame_dir"].cleanup()
