import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';
import { CitizenService } from 'src/app/services/citizen.service';

@Component({
  selector: 'citizen-journal',
  templateUrl: './citizen-journal.component.html',
  styleUrls: ['./citizen-journal.component.scss'],
})
export class CitizenJournalComponent implements OnInit {
  public citizen: Citizen;
  public loading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const citizenId = this.activeRoute.parent.snapshot.params['id'];
      this.citizenService.get(citizenId).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
        this.loading = false;
      });
    });
  }
}
