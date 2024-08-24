import { Component, Input } from '@angular/core';
import { VideoDataDetailed } from '../video-data-detailed';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  @Input() videoData!: VideoDataDetailed;
}
