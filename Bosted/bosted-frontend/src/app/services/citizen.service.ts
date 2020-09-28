import { Injectable } from '@angular/core';
import { Citizen } from '../models/citizen.model';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  constructor() { }

  public getCitizen(citizenId: string): Citizen {
    const citizen1: Citizen = {id: "1", firstname: "Jens", lastname: "Jensen", cpr: "0123456789"};
    const citizen2: Citizen = {id: "2", firstname: "Hans", lastname: "Larsen", cpr: "4567891235"};
    const citizen3: Citizen = {id: "3", firstname: "Dronning", lastname: "Margrethe", cpr: "1234561230"};

    const citizens: Citizen[] = [citizen1, citizen2, citizen3];

    return citizens.find( (citizen: Citizen) => citizen.id === citizenId);
  }

  public editCitizen(citizen: Citizen): void {
    console.log('Edited Citizen:');
    console.log(citizen);
  }
}
