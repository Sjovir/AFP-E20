import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';

@Component({
  selector: 'citizen-overview',
  templateUrl: './citizen-overview.component.html',
  styleUrls: ['./citizen-overview.component.scss'],
})
export class CitizenOverviewComponent implements OnInit {
  public citizen: Citizen;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizen = this.citizenService.getCitizen(citizenId);
    });
  }
}
