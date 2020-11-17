import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citizen } from '../models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  readonly BOSTED_PORT: string = '7100';
  readonly MEDICIN_PORT: string = '7200';
  readonly PORT_PARAM: string = 'citizenId';

  readonly BASE_URL: string = `http://${environment.host}:${this.PORT_PARAM}/api/citizens`;

  constructor(private http: HttpClient) {}

  public get(citizenId: string): Observable<Citizen> {
    return this.http.get<Citizen>(
      this.BASE_URL.replace(this.PORT_PARAM, this.MEDICIN_PORT).concat(
        `/${citizenId}`
      )
    );
  }

  public update(citizen: Citizen) {
    return this.http.put(
      this.BASE_URL.replace(this.PORT_PARAM, this.BOSTED_PORT).concat(
        `/${citizen.id}`
      ),
      citizen,
      { responseType: 'text' }
    );
  }
}
