import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuiler: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuiler.group({
      username: ['', Validators.required],
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login(): void {
    alert('Test');
    //TODO: connect to backend endpoint
  }

  public get usernameControl(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }

  public get passwordControl(): AbstractControl {
    console.log(this.loginForm.get('password').errors);
    return this.loginForm.get('password') as AbstractControl;
  }

  public get anyErrors(): boolean {
    return (
      this.usernameControl.errors !== null ||
      this.passwordControl.errors !== null
    );
  }
}
