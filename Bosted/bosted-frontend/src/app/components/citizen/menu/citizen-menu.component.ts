import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Citizen } from 'src/app/models/citizen.model';
import { HeartbeatService } from 'src/app/services/heartbeat.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';

@Component({
  selector: 'citizen-menu',
  templateUrl: './citizen-menu.component.html',
  styleUrls: ['./citizen-menu.component.scss'],
})
export class CitizenMenuComponent implements OnInit {
  @Input() citizen: Citizen;

  public permJournalView: boolean;
  public permMedicineView: boolean;

  public activePage: string;

  public medicineAlive: boolean = false;

  constructor(
    private heartbeatService: HeartbeatService,
    private permissionService: PermissionService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url: string = event.urlAfterRedirects;
        const urlSplit: string[] = url.split('/');

        const citizenIndex = urlSplit.indexOf('citizen');
        this.activePage = urlSplit[citizenIndex + 2];
      });
  }

  ngOnInit(): void {
    this.permJournalView = this.permissionService.hasPermissions(
      Permission.JOURNAL_VIEW
    );
    this.permMedicineView = this.permissionService.hasPermissions(
      Permission.MEDICINE_VIEW
    );
    this.heartbeatService.pingMedicine().subscribe(
      () => {
        this.medicineAlive = true;
      },
      (err) => {
        if (err.status === 200) {
          this.medicineAlive = true;
        } else {
          this.medicineAlive = false;
        }
      }
    );
  }

  public isPageActive(page: string): boolean {
    return this.activePage === page;
  }
}
