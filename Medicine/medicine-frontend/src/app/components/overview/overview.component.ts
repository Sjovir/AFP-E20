import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCitizenModalComponent } from 'src/app/modals/edit-citizen-modal/edit-citizen-modal.component';
import { Citizen } from 'src/app/models/citizen.model';
import { Ordination } from 'src/app/models/ordination.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { LocationService } from 'src/app/services/location.service';
import { OrdinationService } from 'src/app/services/ordination.service';

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
    private locationService: LocationService,
    private modalService: NgbModal,
    private ordinationService: OrdinationService
  ) {}

  ngOnInit(): void {
    const url = window.location.href;
    const urlSplit: string[] = url.split('/');

    const citizenStringIndex: number = urlSplit.indexOf('citizen');
    const citizenId: string = urlSplit[citizenStringIndex + 1];

    this.ordinationService
      .getOrdinations(citizenId)
      .subscribe((ordinations) => {
        this.ordinations = ordinations;
      });

    this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
      this.citizen = citizen;
    });
  }

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
    this.locationService.redirect('create-ordination');
  }

  public editOrdination(ordinationId: string) {
    this.locationService.redirect(`edit-ordination/${ordinationId}`);
  }
}
