import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public redirect(page: string) {
    const url:string = window.location.href;

    const urlSplit: string[] = url.split('/');
    const medicineIndex: number = urlSplit.indexOf('medicine');

    urlSplit.splice(medicineIndex + 1);
    urlSplit.push(page);

    const newUrl: string = urlSplit.join('/');
    window.location.replace(newUrl);
  }
}
