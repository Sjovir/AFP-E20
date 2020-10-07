import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access-token');

    let isAuthenticated = !this.jwtHelper.isTokenExpired(accessToken);

    return isAuthenticated;
  }
}
