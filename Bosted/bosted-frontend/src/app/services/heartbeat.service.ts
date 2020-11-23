import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeartbeatService {
  constructor(public http: HttpClient) {}

  public pingAuth() {
    return this.http.get<string>(
      `http://${environment.host}:7100/heartbeats/auth/frontend`
    );
  }

  public pingMedicine() {
    return this.http.get<string>(
      `http://${environment.host}:7100/heartbeats/medicine/frontend`
    );
  }
}
