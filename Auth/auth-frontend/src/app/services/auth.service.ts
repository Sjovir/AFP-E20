import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL: string = `http://${environment.host}:7000/api`;

  constructor(private http: HttpClient) {}

  public register(
    username: string,
    password: string,
    cpr: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const body = {
      username,
      password,
      cpr,
      firstName,
      lastName,
    };
    return this.http.post<any>(`${this.BASE_URL}/register`, body);
  }

  public login(username: string, password: string): Observable<any> {
    let body = { username, password };
    if (username.match(/^\d{10}$/)) {
      body['cpr'] = username;
      delete body.username;
    }

    return this.http.post<any>(`${this.BASE_URL}/login`, body);
  }
}
