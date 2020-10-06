import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citizen } from '../models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  readonly BASE_URL: string = 'http://localhost:7100/api/citizens';

  constructor(private http: HttpClient) {}

  public get(citizenId: string): Observable<Citizen> {
    return this.http.get<Citizen>(`${this.BASE_URL}/${citizenId}`);
  }

  public editCitizen(citizen: Citizen) {
    return this.http.put<any>(`${this.BASE_URL}/${citizen.id}`, citizen);
  }

  public createCitizen(citizen: Citizen) {
    return this.http.post<any>(this.BASE_URL, citizen);
  }
}
