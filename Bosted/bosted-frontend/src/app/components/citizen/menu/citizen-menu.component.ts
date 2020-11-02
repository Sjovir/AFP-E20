import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { AliveService, ServiceAddress } from 'src/app/services/alive.service';

@Component({
  selector: 'citizen-menu',
  templateUrl: './citizen-menu.component.html',
  styleUrls: ['./citizen-menu.component.scss'],
})
export class CitizenMenuComponent implements OnInit {
  @Input() citizen: Citizen;

  public activePage: string;

  public medicineAlive: boolean = false;

  constructor(private aliveService: AliveService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url: string = event.urlAfterRedirects;
        const urlSplit: string[] = url.split('/');

        const citizenIndex = urlSplit.indexOf('citizen');
        this.activePage = urlSplit[citizenIndex + 2];
      }
    });
  }

  ngOnInit(): void {
    this.aliveService.isAlive(ServiceAddress.MEDICINE).subscribe(
      () => {
        this.medicineAlive = true;
      },
      (err) => {
        if (err.status === 200) {
          this.medicineAlive = true;
        } else {
          this.medicineAlive = false;
        }
      }
    );
  }

  public isPageActive(page: string): boolean {
    return this.activePage === page;
  }
}
