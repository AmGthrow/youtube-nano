import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { VideoDataDetailed, VideoData } from './video-data';
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
