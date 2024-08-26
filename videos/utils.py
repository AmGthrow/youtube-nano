import os
from io import BytesIO

import ffmpeg
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from PIL import Image


def generate_thumbnail(video_file):
    temp_video_file = NamedTemporaryFile(suffix=".mp4")
    try:
        for chunk in video_file.chunks():
            temp_video_file.write(chunk)
        temp_video_file.seek(0)

        thumbnail_name = f"{os.path.splitext(video_file.name)[0]}.jpg"

        # Use ffmpeg to capture the first frame of the video
        process = (
            ffmpeg.input(temp_video_file.name, ss=0)
            .output("pipe:", vframes=1, format="image2", vcodec="mjpeg")
            .run(capture_stdout=True, capture_stderr=True)
        )

        # Save the image as a JPEG file in memory
        temp_image = BytesIO(process[0])
        image = Image.open(temp_image)
        image_file = BytesIO()
        image.save(image_file, format="JPEG")

        # Save the thumbnail image to the Django ImageField
        image_file.seek(0)
        thumbnail = File(image_file, name=thumbnail_name)

        return thumbnail

    finally:
        temp_video_file.close()
