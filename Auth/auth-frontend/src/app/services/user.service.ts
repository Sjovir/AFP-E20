import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_URL: string = 'http://localhost:7000/api/users';

  constructor(private http: HttpClient) {}

  getUserOnUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/username/${username}`);
  }
}
