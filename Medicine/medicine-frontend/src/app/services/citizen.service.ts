import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Citizen } from '../models/citizen.model';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  constructor() { }

  public get(citizenId: string): Observable<Citizen> {
    // TODO: Call Medicine API to get citizen
    const citizen: Citizen = {id: 'c0', firstName: 'Jens', lastName: 'Jensen', cpr: '1234567899'};
    return of(citizen);
  }

  public update(citizen: Citizen): Observable<any> {
    // TODO: Call Bosted API to update citizen
    console.log('Call to unimplemented method updateOrdination in MedicineService: Trying to update:');
    console.log(citizen);

    return of({})
  }
}
