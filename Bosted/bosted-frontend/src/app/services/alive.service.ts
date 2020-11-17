import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AliveService {
  constructor(public http: HttpClient) {}

  public isAlive(serviceAddress: ServiceAddress) {
    return this.http.get<string>(
      `http://${environment.host}:${serviceAddress}/main.js`
    );
  }
}

export enum ServiceAddress {
  AUTH = '8000',
  MEDICINE = '8200',
}
