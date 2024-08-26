from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
from io import BytesIO


def generate_thumbnail(video_file):
    thumbnail_width = 300
    thumbnail_aspect_ratio = 16 / 9
    thumbnail_height = int(thumbnail_width / thumbnail_aspect_ratio)
    thumbnail_size = (thumbnail_width, thumbnail_height)

    video = Image.open(video_file)

    # Get the first frame of the video
    frame = video.seek(0)
    thumbnail = frame.resize(thumbnail_size, Image.ANTIALIAS)

    # Save the thumbnail as a JPEG in memory
    thumbnail_io = BytesIO()
    thumbnail.save(thumbnail_io, format="JPEG")
    thumbnail_io.seek(0)

    thumbnail_file = InMemoryUploadedFile(
        thumbnail_io,
        field_name="thumbnail_file",
        name=f"{video_file.filename}.jpg",
        content_type="image/jpeg",
        size=thumbnail_io.getbuffer().nbytes,
        charset=None,
    )

    return thumbnail_file
