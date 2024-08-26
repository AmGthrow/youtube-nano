import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { VideosuggestionsComponent } from './videosuggestions/videosuggestions.component';
import { VideoApiService } from './services/video-api.service';
import { VideoData, VideoDataDetailed } from './types/video-data';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoplayerComponent, VideosuggestionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  suggestedVideoList: VideoData[] | undefined;
  mainVideo: VideoDataDetailed | undefined;

  constructor(private videoApiService: VideoApiService) {
    videoApiService.getVideos().subscribe(
      videos => {
        this.suggestedVideoList = videos;

        if (this.suggestedVideoList.length > 0) {
          videoApiService.getVideo(this.suggestedVideoList[0].id).subscribe(
            (video) => {
              this.mainVideo = video;
            },
            (error) => {
              console.error('Error fetching main video:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching suggested videos:', error);
      }
    );
  };
  changeCurrentVideo(id: string) {
    this.videoApiService.getVideo(id).subscribe(video => this.mainVideo = video);
  }
};
