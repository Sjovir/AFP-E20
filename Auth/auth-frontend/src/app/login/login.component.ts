import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
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
    try {
      await this.authService
        .login(this.usernameControl.value, this.passwordControl.value)
        .then((_data: { accessToken: string; refreshToken: string }) => {
          this.onLoginMessage = `Logged in to account ${this.usernameControl.value}. Redirecting in a moment...`;
          this.onLoginStatus = 0;

          localStorage.setItem('access-token', _data.accessToken);
          localStorage.setItem('refresh-token', _data.refreshToken);
        });
    } catch (err) {
      this.onLoginMessage = err.message;
      this.onLoginStatus = 1;
    }
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
