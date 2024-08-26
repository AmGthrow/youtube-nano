import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoData, VideoDataDetailed } from '../types/video-data';
import { getHeaders } from './helpers';

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
  patchVideo(id: string, data: VideoDataDetailed): Observable<VideoDataDetailed> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.patch<VideoDataDetailed>(
      url,
      {
        title: data.title,
        description: data.description,
        likes: data.likes,
      },
      { headers: getHeaders() }
    );
  };

  deleteVideo(id: string): Observable<unknown> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(
      url,
      { headers: getHeaders() }
    );
  }

  getVideos(): Observable<VideoData[]> {
    return this.http.get<VideoData[]>(this.apiUrl);
  };
};
