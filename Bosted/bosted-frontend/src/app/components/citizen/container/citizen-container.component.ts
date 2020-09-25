import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';

@Component({
  selector: 'citizen-container',
  templateUrl: './citizen-container.component.html',
  styleUrls: ['./citizen-container.component.scss'],
})
export class CitizenContainerComponent implements OnInit {
  public citizen: Citizen;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = params['id'];
      this.citizen = this.citizenService.getCitizen(citizenId);
    });
  }
}
