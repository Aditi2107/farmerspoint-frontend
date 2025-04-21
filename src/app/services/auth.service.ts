
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface LoginResponse {
  message: string;
  access_token: string;
  user: {
    id: number;
    name: string;
    role: string;
    password_hash:string;
    phonenumber:string;

  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // private baseUrl = 'http://172.18.0.3:5001';
  private baseUrl = 'https://13.48.195.231:443';
  // private baseUrl = 'http://127.0.0.1:5001';

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/user/register`, userData);
  }

  loginUser(payload: any):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, payload);
  }
  storeToken(access_token: string) {
    localStorage.setItem('token', access_token);
  }

  storeUserRole(role: string) {
    
    localStorage.setItem('role', role);
  }

  getUserRole(): string | null {
    
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
