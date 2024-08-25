import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { VideoData } from '../video-data';

@Component({
  selector: 'app-videosuggestions',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './videosuggestions.component.html',
  styleUrl: './videosuggestions.component.scss',
})
export class VideosuggestionsComponent {
  thumbnail = 'https://static-cse.canva.com/blob/1667997/1600w-wlXEWqHuexQ.jpg';
  @Input() videoData!: VideoData;
}
