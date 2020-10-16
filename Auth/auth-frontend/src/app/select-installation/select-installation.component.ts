import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Installation } from '../models/installation.model';
import { JavaWebTokens } from '../models/java-web-token.model';
import { User } from '../models/user.model';
import { InstallationService } from '../services/installation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-select-installation',
  templateUrl: './select-installation.component.html',
  styleUrls: ['./select-installation.component.scss'],
})
export class SelectInstallationComponent implements OnInit {
  public userInstallations: Installation[];
  public user: User;

  constructor(
    private installationService: InstallationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access-token');

    const username: string = this.jwtHelper.decodeToken(accessToken)[
      'username'
    ];

    this.userService.getUserOnUsername(username).subscribe((response) => {
      this.user = response;

      this.installationService
        .getInstallationsOnUser(this.user.id)
        .subscribe((installations: Installation[]) => {
          this.userInstallations = installations;
        });
    });
  }

  public chooseInstallation(installationId: string): void {
    this.installationService
      .selectInstallation(installationId)
      .subscribe((jwt: JavaWebTokens) => {
        localStorage.setItem('access-token', jwt.accessToken);
        localStorage.setItem('refresh-token', jwt.refreshToken);

        this.router.navigate(['installation/', installationId]);

        window.location.replace(`installation/${installationId}`);

        console.log('Installation selected. Redirecting');
      });
  }
}
