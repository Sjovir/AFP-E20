import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Drug } from '../models/drug.model';
import { Ordination } from '../models/ordination.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private ordinations: Ordination[] = [
    { id: 'o1', drug: { id: 'd1', name: 'Panodil', code: 'E20' }, drugAmount: 5, drugUnit: 'mg', startDate: new Date(2020, 10, 18, 8), endDate: null },
    { id: 'o2', drug: { id: 'd2', name: 'Metadon', code: 'E45' }, drugAmount: 2, drugUnit: 'ml', startDate: new Date(2020, 10, 10, 8), endDate: new Date(2022, 10, 10, 8) },
    { id: 'o3', drug: { id: 'd3', name: 'Nikotin Tyggegummi', code: 'A5' }, drugAmount: 1, drugUnit: 'stk', startDate: new Date(2019, 11, 11, 8), endDate: null },
  ];

  constructor() { }

  public getOrdinations(citizenId: string): Observable<Ordination[]> {
    return of(this.ordinations);
  }

  public getOrdination(ordinationId: string): Observable<Ordination> {
    return of(this.ordinations.find((ordination) => ordination.id === ordinationId));
  }

  public createOrdination(citizenId: string, ordination: Ordination): Observable<any> {
    //TODO: Implement http call to backend
    console.log('Call to unimplemented method createOrdination in MedicineService: Trying to create:');
    console.log(ordination);
    
    return of({});
  }

  public updateOrdination(ordination: Ordination): Observable<any> {
    //TODO: Implement http call to backend
    console.log('Call to unimplemented method updateOrdination in MedicineService: Trying to update:');
    console.log(ordination);
    
    return of({});
  }

  public getDrugs(): Observable<Drug[]> {
    const drugs: Drug[] = [
      { id: 'd1', name: 'Panodil', code: 'E20' },
      { id: 'd2', name: 'Metadon', code: 'E45' },
      { id: 'd3', name: 'Nikotin Tyggegummi', code: 'A5' },
    ];

    return of(drugs);
  }

  public getDrugUnits(): Observable<string[]> {
    const units: string[] = ['g', 'mg', 'ml', 'stk'];
    return of(units);
  }

}
