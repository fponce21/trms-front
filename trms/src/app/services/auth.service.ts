import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl; // http://localhost:8080

  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string; role: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
      Accept: 'application/json',
    });
    return this.http.get(`${this.apiUrl}/login`, { headers, responseType: 'text' });
  }
}