import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCitizenModalComponent } from 'src/app/modals/edit-citizen-modal/edit-citizen-modal.component';
import { Citizen } from 'src/app/models/citizen.model';
import { Ordination } from 'src/app/models/ordination.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { LocationService } from 'src/app/services/location.service';
import { OrdinationService } from 'src/app/services/ordination.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  public permCitizenEdit: boolean;
  public permMedicineView: boolean;
  public permMedicineEdit: boolean;

  public citizen: Citizen;
  public ordinations: Ordination[];

  private citizenEvent: { unsubscribe(): void };

  constructor(
    private citizenService: CitizenService,
    private locationService: LocationService,
    private modalService: NgbModal,
    private permissionService: PermissionService,
    private ordinationService: OrdinationService,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.permCitizenEdit = this.permissionService.hasPermissions(
      Permission.CITIZEN_EDIT
    );
    this.permMedicineView = this.permissionService.hasPermissions(
      Permission.MEDICINE_VIEW
    );
    this.permMedicineEdit = this.permissionService.hasPermissions(
      Permission.MEDICINE_EDIT
    );

    const url = window.location.href;
    const urlSplit: string[] = url.split('/');

    const citizenStringIndex: number = urlSplit.indexOf('citizen');
    const citizenId: string = urlSplit[citizenStringIndex + 1];

    if (this.permMedicineView) {
      this.ordinationService
        .getOrdinations(citizenId)
        .subscribe((ordinations) => {
          this.ordinations = ordinations;
        });
    }

    if (this.permCitizenEdit) {
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;

        this.citizenEvent = this.sseService
          .getCitizenEvents(this.citizen.id)
          .subscribe((event) => {
            const json = JSON.parse(event.data);

            switch (json.event) {
              case 'CITIZEN_UPDATE':
                this.updateCitizen(json.data.citizen);
                break;
            }
          });
      });
    }
  }

  ngOnDestroy(): void {
    this.citizenEvent.unsubscribe();
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

  private updateCitizen(partialCitizen: Partial<Citizen>): void {
    Object.keys(partialCitizen).forEach((name) => {
      this.citizen[name] = partialCitizen[name];
    });
  }
}
