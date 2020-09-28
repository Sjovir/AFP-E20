import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { EditCitizenModalComponent } from '../modals/edit-citizen-modal/edit-citizen-modal.component';

@Component({
  selector: 'citizen-overview',
  templateUrl: './citizen-overview.component.html',
  styleUrls: ['./citizen-overview.component.scss'],
})
export class CitizenOverviewComponent implements OnInit {
  public citizen: Citizen;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizen = this.citizenService.getCitizen(citizenId);
    });
  }

  public editCitizen(): void {
    const modalReference = this.modalService.open(EditCitizenModalComponent);

    modalReference.componentInstance.citizen = this.citizen;

    modalReference.result.then(
      (result) => {
        this.updateCitizen(result);
        this.citizenService.editCitizen(this.citizen);
      },
      () => {}
    );
  }

  private updateCitizen(partialCitizen: Partial<Citizen>): void {
    Object.keys(partialCitizen).forEach((name) => {
      this.citizen[name] = partialCitizen[name];
    });
  }
}
