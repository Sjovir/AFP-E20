import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Citizen } from 'src/app/models/citizen.model';

@Component({
  selector: 'citizen-menu',
  templateUrl: './citizen-menu.component.html',
  styleUrls: ['./citizen-menu.component.scss'],
})
export class CitizenMenuComponent implements OnInit {
  @Input() citizen: Citizen;

  public activePage: string;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url: string = event.urlAfterRedirects;
        this.activePage = url.split('/').pop();
      }
    });
  }

  ngOnInit(): void {}

  public isPageActive(page: string): boolean {
    return this.activePage === page;
  }
}
