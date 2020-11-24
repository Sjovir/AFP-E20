import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert } from 'src/app/models/alert.model';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';
import { SseService } from 'src/app/services/sse.service';
import { CitizenModalComponent } from '../modals/citizen-modal/citizen-modal.component';

@Component({
  selector: 'citizen-overview',
  templateUrl: './citizen-overview.component.html',
})
export class CitizenOverviewComponent implements OnInit {
  public permCitizenEdit: boolean;
  public citizen: Citizen;

  public alert: Alert;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private modalService: NgbModal,
    private permissionService: PermissionService,
    private router: Router,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.permCitizenEdit = this.permissionService.hasPermissions(
      Permission.CITIZEN_EDIT
    );

    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;

        let citizenEvent: { unsubscribe(): void };
        citizenEvent = this.sseService
          .getCitizenEvents(this.citizen.id)
          .subscribe(
            (event) => {
              const json = JSON.parse(event.data);

              console.log('Incoming data:');
              console.log(json.data);
              switch (json.event) {
                case 'CITIZEN_UPDATE':
                  console.log('CITIZEN UPDATE!');
                  this.updateCitizen(json.data.citizen);
                  this.alert = {
                    type: 'warning',
                    message: 'Denne borger er blevet opdateret',
                  };
                  setTimeout(() => (this.alert = null), 5000);
                  break;
              }
            },
            (error) => {
              console.log(error);
            }
          );

        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) => {
            citizenEvent.unsubscribe();
          });
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
