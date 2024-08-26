import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { VideoData } from '../types/video-data';

@Component({
  selector: 'app-videosuggestions',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './videosuggestions.component.html',
  styleUrl: './videosuggestions.component.scss',
})
export class VideosuggestionsComponent {
  @Input() videoData!: VideoData;
}
