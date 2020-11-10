import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordination } from '../models/ordination.model';

@Injectable({
  providedIn: 'root',
})
export class OrdinationService {
  readonly CITIZEN_PARAM: string = 'citizenId';

  readonly BASE_URL: string = `http://localhost:7200/api/citizens/${this.CITIZEN_PARAM}/ordinations`;

  constructor(private http: HttpClient) {}

  public getOrdinations(citizenId: string): Observable<Ordination[]> {
    return this.http.get<Ordination[]>(
      this.BASE_URL.replace(this.CITIZEN_PARAM, citizenId)
    );
  }

  public getOrdination(
    citizenId: string,
    ordinationId: string
  ): Observable<Ordination> {
    return this.http.get<Ordination>(
      this.BASE_URL.replace(this.CITIZEN_PARAM, citizenId).concat(
        `/${ordinationId}`
      )
    );
  }

  public createOrdination(
    citizenId: string,
    ordination: Ordination
  ): Observable<any> {
    return this.http.post(
      this.BASE_URL.replace(this.CITIZEN_PARAM, citizenId),
      ordination,
      { responseType: 'text' }
    );
  }

  public updateOrdination(
    citizenId: string,
    ordination: Ordination
  ): Observable<any> {
    return this.http.put(
      this.BASE_URL.replace(this.CITIZEN_PARAM, citizenId).concat(
        `/${ordination.id}`
      ),
      ordination,
      { responseType: 'text' }
    );
  }
}
