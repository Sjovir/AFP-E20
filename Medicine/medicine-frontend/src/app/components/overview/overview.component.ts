import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { EditCitizenModalComponent } from 'src/app/modals/edit-citizen-modal/edit-citizen-modal.component';
import { Citizen } from 'src/app/models/citizen.model';
import { Ordination } from 'src/app/models/ordination.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public citizen: Citizen;
  public ordinations: Ordination[];

  constructor(
    private citizenService: CitizenService,
    private jwtHelper: JwtHelperService,
    private medicineService: MedicineService,
    private modalService: NgbModal,
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

        this.citizenService.get(route).subscribe((citizen: Citizen) => {
          this.citizen = citizen;
        });
      });
  }

  ngOnInit(): void {}

  public editCitizen() {
    const modalReference = this.modalService.open(EditCitizenModalComponent);

    modalReference.componentInstance.citizen = this.citizen;

    modalReference.result.then(
      (updatedCitizen: Citizen) => {
        this.citizenService.update(updatedCitizen).subscribe(() => {});
      },
      () => {}
    );
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
