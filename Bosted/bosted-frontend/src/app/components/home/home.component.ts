import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { InstallationService } from 'src/app/services/installation.service';
import { CitizenModalComponent } from '../citizen/modals/citizen-modal/citizen-modal.component';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public citizens: Citizen[];

  constructor(
    private citizenService: CitizenService,
    private installationService: InstallationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.citizens = this.installationService.getCitizensOnInstallation('uuid');
  }

  public createCitizen() {
    const modalReference = this.modalService.open(CitizenModalComponent);

    modalReference.componentInstance.modalType = 'create';

    modalReference.result.then(
      (result) => {
        const citizen: Citizen = result;
        this.citizenService.createCitizen(citizen);
      },
      () => {}
    );
  }
}
