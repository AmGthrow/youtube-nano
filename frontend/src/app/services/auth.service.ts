import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoData, VideoDataDetailed } from '../types/video-data';
import { UserCreate, UserCreateResponse } from '../types/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api/v1/auth/'; // TODO: Make the BASE_API_URL an environment variable
    constructor(private http: HttpClient) { }

    postRegistration(newUserInfo: UserCreate): Observable<UserCreateResponse> {
        return this.http.post<UserCreateResponse>(`${this.apiUrl}registration/`, newUserInfo);
    }
};
