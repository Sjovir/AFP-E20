import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public isAuthenticated(): Observable<boolean> {
    const accessToken: string = localStorage.getItem('access-token');

    if (!this.jwtHelper.isTokenExpired(accessToken)) {
      return of(true); // User is authenticated
    }

    const refreshToken: string = localStorage.getItem('refresh-token');

    if (this.jwtHelper.isTokenExpired(refreshToken)) {
      return of(false); // Refresh token has expired
    }

    return this.http
      .post<string>(`http://${environment.host}:7000/api/refresh`, {
        refreshToken,
      })
      .pipe(
        map(
          (response) => {
            localStorage.setItem('access-token', response['accessToken']);
            return true;
          },
          (error) => {
            return false;
          }
        )
      );
  }
}
