import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async register(
    username: string,
    password: string,
    cpr: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    try {
      await axios.post('http://localhost:3000/api/register', {
        username,
        cpr,
        password,
        firstName,
        lastName,
      });
    } catch (err) {
      const request = err.response;

      if (request.status === 400) {
        if (request.data.code === 'CPR_OR_USERNAME_IN_USE') {
          throw new Error('User already exists.');
        } else {
          throw new Error('Server-side error. Contract staff!');
        }
      }
    }
  }
}
