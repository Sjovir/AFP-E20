import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

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
        password,
        cpr,
        firstName,
        lastName,
      });
    } catch (err) {
      const request = err.response;

      if (request.status === 400) {
        if (request.data.code === 'CPR_OR_USERNAME_IN_USE') {
          throw new Error('User already exists.');
        } else {
          throw new Error('Server-side error. Contact staff!');
        }
      }
    }
  }

  async login(username: string, password: string): Promise<Object> {
    try {
      let body = { username, password };
      if (username.match(/^\d{10}$/)) {
        body['cpr'] = username;
        delete body.username;
      }
      let data: { accessToken: string; refreshToken: string };
      await axios
        .post('http://localhost:3000/api/login', body)
        .then((response) => {
          data = response.data;
        });
      return data;
    } catch (err) {
      const request = err.response;

      if (request.status === 400) {
        if (request.data.code === 'CPR_XOR_USERNAME_LOGIN') {
          throw new Error('Server-side error. Contact staff!');
        } else if (request.data.code === 'ACCOUNT_NOT_EXISTS') {
          throw new Error('Account with given credentials do not exist.');
        } else {
          throw new Error('Server-side error. Contact staff!');
        }
      }
    }
  }
}
