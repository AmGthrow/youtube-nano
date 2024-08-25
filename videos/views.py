from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from videos.models import Video
from videos.permissions import IsUploaderOrReadOnly
from videos.serializers import VideoDetailSerializer, VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsUploaderOrReadOnly]

    def get_serializer_class(self):
        if self.action in ["list"]:
            return VideoSerializer
        return VideoDetailSerializer

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)
