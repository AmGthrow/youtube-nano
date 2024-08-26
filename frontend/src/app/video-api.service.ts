import { Injectable } from '@angular/core';
import { VideoData, VideoDataDetailed } from './types/video-data';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {

  getVideo(id: string): VideoDataDetailed {
    return {
      id: "d34cd0d1-00c2-43ec-b330-89ab0eaeeb38",
      title: 'My Awesome Video',
      video_file: 'https://file-examples.com/storage/fe45dfa76e66c6232a111c9/2017/04/file_example_MP4_1920_18MG.mp4',
      description: 'This is a description of my awesome video.',
      uploader: 'Jimmy Johnson',
      likes: 456
    };
  };
  getVideos(): VideoData[] {
    return [
      {
        id: "503a22b9-89fe-461b-8d1b-e4c0bc1e8368",
        title: 'Video Two',
        uploader: 'Billy Bobblekins',
      },
      {
        id: "69d6bb04-3ded-428f-90a4-51f52d4fa9a3",
        title: 'Video Three',
        uploader: 'Freya Fax',
      },
      {
        id: "da723955-73b2-48e3-a146-45463b2b1784",
        title: 'Video Four',
        uploader: 'Derrick Dinglebop',
      },
    ]
  }
}
