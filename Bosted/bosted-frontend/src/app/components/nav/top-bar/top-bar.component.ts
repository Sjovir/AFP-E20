import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'nav-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  public show: boolean = false;

  public installationId: string;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url: string = event.urlAfterRedirects;

        if (!url.match(/^\/installation\//)) {
          this.show = false;
          return;
        }
        this.show = true;

        const urlFragments = url.split('/');

        const installationIndex = urlFragments.indexOf('installation');

        if (installationIndex !== -1)
          this.installationId = urlFragments[installationIndex + 1];
      }
    });
  }

  ngOnInit(): void {}

  public logout() {
    localStorage.clear();
    window.location.reload();
  }
}
