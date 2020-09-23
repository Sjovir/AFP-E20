import { Component, OnInit } from '@angular/core';
import { Citizen } from 'src/app/models/citizen.model';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public citizens: Citizen[];

  constructor(private installationService: InstallationService) {}

  ngOnInit(): void {
    this.citizens = this.installationService.getCitizensOnInstallation('uuid');
  }
}
