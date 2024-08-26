from rest_framework import serializers

from videos.models import Video


class VideoDetailSerializer(serializers.ModelSerializer):
    uploader = serializers.SerializerMethodField()

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

    def get_uploader(self, obj):
        return obj.uploader.username


class VideoSerializer(serializers.ModelSerializer):
    uploader = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = [
            "id",
            "thumbnail_file",
            "title",
            "uploader",
        ]

    def get_uploader(self, obj):
        return obj.uploader.username
