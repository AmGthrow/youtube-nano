import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreate, LoginResponse, UserDetails } from '../types/auth';
import { getHeaders } from './helpers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api/v1/auth/'; // TODO: Make the BASE_API_URL an environment variable

    public isAuthenticated = false;
    public access = '';
    public refresh = localStorage.getItem('refresh') || '';
    public user: UserDetails | undefined = undefined;

    constructor(private http: HttpClient) { }

    setAuth(response: LoginResponse) {
        this.isAuthenticated = true;
        this.access = response.access;
        this.refresh = response.refresh;
        this.user = response.user;
        localStorage.setItem('refresh', response.refresh);
    }
    logout() {
        this.isAuthenticated = false;
        this.access = '';
        this.refresh = '';
        this.user = undefined;
        localStorage.removeItem('refresh');
    }


    postRegistration(newUserInfo: UserCreate): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}registration/`,
            newUserInfo,
            { headers: getHeaders() },
        );
    }

    postLogout(): Observable<{ "detail": string }> {
        return this.http.post<{ "detail": string }>(`${this.apiUrl}logout/`,
            { headers: getHeaders() },
        )
    }
};
