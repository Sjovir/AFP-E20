import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';

@Component({
  selector: 'citizen-journal',
  templateUrl: './citizen-journal.component.html',
})
export class CitizenJournalComponent implements OnInit {
  public citizen: Citizen;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
      });
    });
  }
}
