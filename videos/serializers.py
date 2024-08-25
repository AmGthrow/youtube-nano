from rest_framework import serializers

from videos.models import Video


class VideoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            "id",
            "video_file",
            "title",
            "description",
            "uploader",
            "likes",
            "uploaded_at",
        ]


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "uploader",
        ]
