import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citizen } from '../models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  readonly BASE_URL: string = `http://${environment.host}:7200/api/citizens`;

  constructor(private http: HttpClient) {}

  public get(citizenId: string): Observable<Citizen> {
    return this.http.get<Citizen>(this.BASE_URL);
  }

  public update(citizen: Citizen) {
    return this.http.put(this.BASE_URL, citizen, {
      responseType: 'text',
    });
  }
}
