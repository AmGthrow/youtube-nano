import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoData, VideoDataDetailed } from '../types/video-data';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/videos/';
  constructor(private http: HttpClient) { }

  getVideo(id: string): Observable<VideoDataDetailed> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<VideoDataDetailed>(url);
  };
  getVideos(): Observable<VideoData[]> {
    return this.http.get<VideoData[]>(this.apiUrl);
  };
};
