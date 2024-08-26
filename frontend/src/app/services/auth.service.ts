import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreate, UserCreateResponse } from '../types/auth';
import { getHeaders } from './helpers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api/v1/auth/'; // TODO: Make the BASE_API_URL an environment variable
    constructor(private http: HttpClient) { }

    postRegistration(newUserInfo: UserCreate): Observable<UserCreateResponse> {
        return this.http.post<UserCreateResponse>(`${this.apiUrl}registration/`,
            newUserInfo,
            { headers: getHeaders() },
        );
    }
};
