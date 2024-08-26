import { Injectable } from '@angular/core';
import { VideoData, VideoDataDetailed } from '../types/video-data';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {

  getVideo(id: string): VideoDataDetailed | undefined {
    return [{
      "id": "fd6a037f-7f1a-4e95-b96b-32996e5fad35",
      "video_file": "http://127.0.0.1:8000/media/videos/sample_960x540.mp4",
      "title": "Beach lady",
      "description": "Sample video that shows a lady by a beach",
      "uploader": "testuser1",
      "likes": 500,
      "uploaded_at": "2024-08-26T07:13:10.081651Z"
    },
    {
      "id": "a986ab81-d1ea-4fbf-b12b-11cd83c933ef",
      "video_file": "http://127.0.0.1:8000/media/videos/SampleVideo_1280x720_2mb.mp4",
      "title": "Bunny movie",
      "description": "Sample video that's a bit longer and has an animation of some bunny I don't recognize",
      "uploader": "testuser1",
      "likes": 1000000,
      "uploaded_at": "2024-08-26T07:12:25.968229Z"
    },
    {
      "id": "a0fc8b34-f907-4a37-83aa-7042c17691c3",
      "video_file": "http://127.0.0.1:8000/media/videos/file_example_MP4_640_3MG_Y4cX00g.mp4",
      "title": "testuser1's first upload",
      "description": "Slow rotating earth",
      "uploader": "testuser1",
      "likes": 5,
      "uploaded_at": "2024-08-26T03:52:48.293827Z"
    },
    {
      "id": "c85554be-a98e-4d8b-9869-f06035c76e58",
      "video_file": "http://127.0.0.1:8000/media/videos/file_example_MP4_640_3MG.mp4",
      "title": "First file uploaded via DRF",
      "description": "slow rotating earth",
      "uploader": "Jethro",
      "likes": 3,
      "uploaded_at": "2024-08-26T02:30:40.835606Z"
    }
    ].find(video => video.id === id);
  };
  getVideos(): VideoData[] {
    return [
      {
        "id": "fd6a037f-7f1a-4e95-b96b-32996e5fad35",
        "thumbnail_file": "http://127.0.0.1:8000/media/thumbnails/videos/sample_960x540.jpg",
        "title": "Beach lady",
        "uploader": "testuser1"
      },
      {
        "id": "a986ab81-d1ea-4fbf-b12b-11cd83c933ef",
        "thumbnail_file": "http://127.0.0.1:8000/media/thumbnails/videos/SampleVideo_1280x720_2mb.jpg",
        "title": "Bunny movie",
        "uploader": "testuser1"
      },
      {
        "id": "a0fc8b34-f907-4a37-83aa-7042c17691c3",
        "thumbnail_file": "http://127.0.0.1:8000/media/thumbnails/videos/file_example_MP4_640_3MG_Y4cX00g.jpg",
        "title": "testuser1's first upload",
        "uploader": "testuser1"
      },
      {
        "id": "c85554be-a98e-4d8b-9869-f06035c76e58",
        "thumbnail_file": "http://127.0.0.1:8000/media/thumbnails/videos/file_example_MP4_640_3MG.jpg",
        "title": "First file uploaded via DRF",
        "uploader": "Jethro"
      }
    ];
  };
};
