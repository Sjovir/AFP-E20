import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'citizen-container',
  templateUrl: './citizen-container.component.html',
  styleUrls: ['./citizen-container.component.scss'],
})
export class CitizenContainerComponent implements OnInit, OnDestroy {
  public citizen: Citizen;

  private citizenEvent: { unsubscribe(): void };

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = params['id'];
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
    });
  }

  ngOnDestroy(): void {
    this.citizenEvent.unsubscribe();
  }

  private updateCitizen(partialCitizen: Partial<Citizen>): void {
    Object.keys(partialCitizen).forEach((name) => {
      this.citizen[name] = partialCitizen[name];
    });
  }
}
