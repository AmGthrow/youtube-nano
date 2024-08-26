import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { VideosuggestionsComponent } from './videosuggestions/videosuggestions.component';
import { VideoApiService } from './services/video-api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoplayerComponent, VideosuggestionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  suggestedVideoList;
  mainVideo;

  constructor(private videoApiService: VideoApiService) {
    this.suggestedVideoList = videoApiService.getVideos();
    this.mainVideo = videoApiService.getVideo(this.suggestedVideoList[0].id);
  }

  changeCurrentVideo(id: string) {
    this.mainVideo = this.videoApiService.getVideo(id)
  }
}
