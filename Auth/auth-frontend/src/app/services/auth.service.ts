import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async register(
    email: string,
    password: string,
    cpr: string,
    firstName?: string,
    lastName?: string
  ) {
    const request = await axios.post('http://localhost:3000/api/register', {
      username: email,
      cpr,
      password,
    });

    return request.status === 200;
  }
}
