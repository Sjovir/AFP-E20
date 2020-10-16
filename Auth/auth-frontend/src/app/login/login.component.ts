import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public onLoginMessage: string;
  public onLoginStatus: number;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public login(): void {
    const username: string = this.usernameControl.value;

    this.authService.login(username, this.passwordControl.value).subscribe(
      (response) => {
        this.onLoginMessage = `Logged in to account ${username}. Redirecting in a moment...`;
        this.onLoginStatus = 0;

        localStorage.setItem('access-token', response.accessToken);
        localStorage.setItem('refresh-token', response.refreshToken);

        window.location.replace('select-installation');
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

  public get usernameControl(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }
}
