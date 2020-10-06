import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Installation } from '../models/installation.model';
import { JavaWebToken } from '../models/java-web-token.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { InstallationService } from '../services/installation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public onLoginMessage: string;
  public onLoginStatus: number;

  public state: 'LOGIN' | 'SELECT';

  public userInstallations: Installation[];
  public user: User;

  constructor(
    private authService: AuthService,
    private installationService: InstallationService,
    private formBuilder: FormBuilder
  ) {
    this.state = 'LOGIN';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public login(): void {
    if (this.state !== 'LOGIN') {
      return;
    }

    this.authService
      .login(this.usernameControl.value, this.passwordControl.value)
      .subscribe(
        (response) => {
          this.onLoginMessage = `Logged in to account ${this.usernameControl.value}. Redirecting in a moment...`;
          this.onLoginStatus = 0;

          //TODO: Handle retrieval of User
          this.user = {
            id: '1337',
            username: 'TheChosenOne',
            cpr: '0202872589',
            firstName: 'Anakin',
            lastName: 'Skywalker',
          };

          this.setupInstallations();

          this.state = 'SELECT';

          //TODO: Remove when implementing endpoint for selecting installation
          localStorage.setItem('access-token', response.accessToken);
          localStorage.setItem('refresh-token', response.refreshToken);
        },
        (error) => {
          const errorCode: string = error.error.code;
          if (errorCode === 'CPR_XOR_USERNAME_LOGIN') {
            this.onLoginMessage = 'Server fejl. Kontakt personale!';
          } else if (errorCode === 'ACCOUNT_NOT_EXISTS') {
            this.onLoginMessage =
              'Der findes ingen bruger med de angivne indtastede oplysningner';
          } else {
            this.onLoginMessage = 'Intern fejl. Kontakt personale!';
          }
          this.onLoginStatus = 1;
        }
      );
  }

  public chooseInstallation(installationId: string): void {
    if (this.state !== 'SELECT') {
      return;
    }

    this.installationService
      .selectInstallation(installationId, this.user.id)
      .subscribe((jwt: JavaWebToken) => {
        localStorage.setItem('access-token', jwt.accessToken);
        localStorage.setItem('refresh-token', jwt.refreshToken);

        console.log('Installation selected. Redirecting');
      });
  }

  public get usernameControl(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  private setupInstallations(): void {
    this.installationService
      .getInstallationsForUser(this.user.id)
      .subscribe((installations: Installation[]) => {
        this.userInstallations = installations;
      });
  }
}
