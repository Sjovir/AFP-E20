import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';
import { Installation } from 'src/app/models/installation.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { InstallationService } from 'src/app/services/installation.service';
import { CitizenModalComponent } from '../citizen/modals/citizen-modal/citizen-modal.component';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public installation: Installation;
  public citizens: Citizen[];

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private installationService: InstallationService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const installationId: string = params['installationId'];
      if (!installationId || installationId === 'null') {
        return;
      }

      this.installationService.get(installationId).subscribe(
        (installation: Installation) => {
          this.installation = installation;
          this.updateCitizenTable();
        },
        () => {
          this.router.navigate(['installation']);
        }
      );
    });
  }

  public createCitizen() {
    const modalReference = this.modalService.open(CitizenModalComponent);

    modalReference.componentInstance.modalType = 'create';

    modalReference.result.then(
      (result) => {
        const citizen: Citizen = result;
        this.citizenService.createCitizen(citizen).subscribe((result) => {
          const citizenId: string = result.citizenId;
          this.installationService
            .addCitizen(citizenId, this.installation.id)
            .subscribe(() => {
              this.updateCitizenTable();
            });
        });
      },
      () => {}
    );
  }

  private updateCitizenTable() {
    if (this.installation) {
      this.installationService
        .getCitizensOnInstallation(this.installation.id)
        .subscribe((citizens: Citizen[]) => {
          this.citizens = citizens;
        });
    }
  }
}
