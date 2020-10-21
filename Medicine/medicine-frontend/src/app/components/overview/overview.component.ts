import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ordination } from 'src/app/models/ordination.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public ordinations: Ordination[];

  constructor(
    private jwtHelper: JwtHelperService,
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = event.urlAfterRedirects;

        console.log(route);

        this.medicineService.getOrdinations(route).subscribe((ordinations) => {
          this.ordinations = ordinations;
        });
      });
  }

  ngOnInit(): void {}

  public editCitizen() {
    console.log('Edit Citizen modal');
  }

  public createOrdination() {
    // Implement redirect to correct page
    window.location.replace('create-ordination');
  }

  public editOrdination(ordinationId: string) {
    // Implement redirect to correct page
    window.location.replace(`edit-ordination/${ordinationId}`);
  }
}
