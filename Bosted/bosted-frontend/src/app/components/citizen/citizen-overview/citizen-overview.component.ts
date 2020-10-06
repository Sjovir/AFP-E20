import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { SseService } from 'src/app/services/sse.service';
import { CitizenModalComponent } from '../modals/citizen-modal/citizen-modal.component';

@Component({
  selector: 'citizen-overview',
  templateUrl: './citizen-overview.component.html',
  styleUrls: ['./citizen-overview.component.scss'],
})
export class CitizenOverviewComponent implements OnInit {
  public citizen: Citizen;
  public loading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private modalService: NgbModal,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
        this.loading = false;

        this.sseService.getCitizenEvents(this.citizen.id).subscribe((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  public editCitizen(): void {
    const modalReference = this.modalService.open(CitizenModalComponent);

    modalReference.componentInstance.citizen = this.citizen;
    modalReference.componentInstance.modalType = 'edit';

    modalReference.result.then(
      (result) => {
        this.updateCitizen(result);
        this.citizenService.editCitizen(this.citizen).subscribe(() => {});
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
