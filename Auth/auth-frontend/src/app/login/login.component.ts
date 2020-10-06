import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async login(): Promise<void> {
    this.authService
      .login(this.usernameControl.value, this.passwordControl.value)
      .subscribe(
        (response) => {
          this.onLoginMessage = `Logged in to account ${this.usernameControl.value}. Redirecting in a moment...`;
          this.onLoginStatus = 0;

          localStorage.setItem('access-token', response.accessToken);
          localStorage.setItem('refresh-token', response.refreshToken);
        },
        (error) => {
          const errorCode: string = error.error.code;
          if (errorCode === 'CPR_XOR_USERNAME_LOGIN') {
            this.onLoginMessage = 'Server-side error. Contact staff!';
          } else if (errorCode === 'ACCOUNT_NOT_EXISTS') {
            this.onLoginMessage = 'Account with given credentials do not exist';
          } else {
            this.onLoginMessage = 'Invalid error. Contact staff!';
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

  public get anyErrors(): boolean {
    return (
      this.usernameControl.errors !== null ||
      this.passwordControl.errors !== null
    );
  }
}
