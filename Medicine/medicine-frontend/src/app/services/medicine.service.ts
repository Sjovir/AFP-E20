import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ordination } from '../models/ordination.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor() { }

  public  getOrdinations(userId: string): Observable<Ordination[]> {
    const ordinations: Ordination[] = [
      { id: 'o1', drug: { id: 'd1', name: 'Panodil', code: 'E20' }, drugAmount: 5, drugUnit: 'mg', startDate: new Date(2020, 10, 18, 8), endDate: null },
      { id: 'o2', drug: { id: 'd2', name: 'Metadon', code: 'E45' }, drugAmount: 2, drugUnit: 'ml', startDate: new Date(2020, 10, 10, 8), endDate: null },
      { id: 'o3', drug: { id: 'd3', name: 'Nikotin Tyggegummi', code: 'A5' }, drugAmount: 1, drugUnit: 'stk', startDate: new Date(2019, 11, 11, 8), endDate: null },
    ];

    return of(ordinations);
  }
}
