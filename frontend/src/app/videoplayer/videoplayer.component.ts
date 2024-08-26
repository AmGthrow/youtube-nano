import { Component, Input } from '@angular/core';
import { VideoDataDetailed } from '../types/video-data';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  @Input() videoDataDetailed!: VideoDataDetailed;
}
