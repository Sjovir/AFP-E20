import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';
import { CitizenModalComponent } from '../modals/citizen-modal/citizen-modal.component';

@Component({
  selector: 'citizen-overview',
  templateUrl: './citizen-overview.component.html',
})
export class CitizenOverviewComponent implements OnInit {
  public permCitizenEdit: boolean;

  public citizen: Citizen;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private modalService: NgbModal,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permCitizenEdit = this.permissionService.hasPermissions(
      Permission.CITIZEN_EDIT
    );

    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
      });
    });
  }

  public editCitizen(): void {
    const modalReference = this.modalService.open(CitizenModalComponent);

    modalReference.componentInstance.citizen = this.citizen;
    modalReference.componentInstance.modalType = 'edit';

    modalReference.result.then(
      (updatedCitizen) => {
        updatedCitizen.id = this.citizen.id;
        this.citizenService.editCitizen(updatedCitizen).subscribe(() => {
          this.updateCitizen(updatedCitizen);
        });
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
