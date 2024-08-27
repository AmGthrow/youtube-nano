import os
import tempfile
from io import BytesIO

import ffmpeg
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from PIL import Image

from .ascii import Ascii


def generate_ascii_video(video_file):
    temp_video_file = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False)
    output_video_file = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False)
    frame_dir = tempfile.TemporaryDirectory()

    # Save the video file to a temporary file
    for chunk in video_file.chunks():
        temp_video_file.write(chunk)
    temp_video_file.seek(0)

    # Extract frames from the video using ffmpeg
    frame_pattern = os.path.join(frame_dir.name, "frame_%04d.png")
    ffmpeg.input(temp_video_file.name).output(frame_pattern, r=2).run()

    # Process each frame to convert it to ASCII
    for frame_filename in os.listdir(frame_dir.name):
        if frame_filename.startswith("frame_"):
            frame_path = os.path.join(frame_dir.name, frame_filename)
            ascii_image = Ascii(frame_path)
            ascii_image.density_artify()
            ascii_image.save(frame_path, format="PNG")

    # Recompile the ASCII frames back into a video
    ffmpeg.input(frame_pattern, framerate=2).output(
        output_video_file.name,
        vcodec="libx264",
        pix_fmt="yuv420p",
        movflags="+faststart",
    ).overwrite_output().run()
    # Convert the output video to a Django File object
    output_video_file.seek(0)
    ascii_video = File(
        output_video_file,
        name=f"{os.path.splitext(video_file.name)[0]}_ascii.mp4",
    )

    return ascii_video, {
        "temp_video_file": temp_video_file,
        "output_video_file": output_video_file,
        "frame_dir": frame_dir,
    }


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

        # Ascii-fy the thumbnail
        temp_image = BytesIO(process[0])
        ascii_image = Ascii(temp_image)
        ascii_image.density_artify()
        image_file = BytesIO()
        ascii_image.save(image_file, format="JPEG")
        image_file.seek(0)
        thumbnail = File(image_file, name=thumbnail_name)
        return thumbnail

    finally:
        temp_video_file.close()
