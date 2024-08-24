import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { VideoDataDetailed } from './video-data-detailed';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoplayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  videoData: VideoDataDetailed = {
    title: 'My Awesome Video',
    description: 'This is a description of my awesome video.',
    likes: 456
  };
}
