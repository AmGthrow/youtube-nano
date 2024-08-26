import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { VideoDataDetailed, VideoData } from './types/video-data';
import { VideosuggestionsComponent } from './videosuggestions/videosuggestions.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoplayerComponent, VideosuggestionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  mainVideo: VideoDataDetailed = {
    id: 1,
    title: 'My Awesome Video',
    video_file: 'https://file-examples.com/storage/fe45dfa76e66c6232a111c9/2017/04/file_example_MP4_1920_18MG.mp4',
    description: 'This is a description of my awesome video.',
    uploader: 'Jimmy Johnson',
    likes: 456
  };

  suggestedVideoList: VideoData[] = [
    {
      id: 2,
      title: 'Video Two',
      uploader: 'Billy Bobblekins',
    },
    {
      id: 3,
      title: 'Video Three',
      uploader: 'Freya Fax',
    },
    {
      id: 4,
      title: 'Video Four',
      uploader: 'Derrick Dinglebop',
    },
  ]
}
