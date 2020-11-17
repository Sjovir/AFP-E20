import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Drug } from '../models/drug.model';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  readonly BASE_URL: string = `http://${environment.host}:7200/api/drugs`;

  constructor(private http: HttpClient) {}

  public getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.BASE_URL);
  }

  public getDrugUnits(): Observable<string[]> {
    const units: string[] = ['g', 'mg', 'ml', 'stk'];
    return of(units);
  }
}
