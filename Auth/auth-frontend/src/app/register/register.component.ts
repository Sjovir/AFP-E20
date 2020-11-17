import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public onSubmitMessage: string;
  public onSubmitStatus: number;
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuiler.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async onSubmit(): Promise<void> {
    const {
      username,
      password,
      cpr,
      firstName,
      lastName,
    } = this.registerForm.value;

    this.authService
      .register(username, password, cpr, firstName, lastName)
      .subscribe(
        (response) => {
          this.onSubmitMessage = `Account ${response.username} has been created.`;
          this.onSubmitStatus = 0;
        },
        (error) => {
          const errorCode: string = error.error.code;
          if (errorCode === 'CPR_OR_USERNAME_IN_USE') {
            this.onSubmitMessage =
              'User with that CPR or username already exists';
          } else {
            this.onSubmitMessage = 'Invalid server-side error. Contact staff!';
          }
          this.onSubmitStatus = 1;
        }
      );
  }

  public gotoLoginPage() {
    window.location.replace('login');
  }

  get usernameControl(): AbstractControl {
    return this.registerForm.get('username') as AbstractControl;
  }

  get passwordControl(): AbstractControl {
    return this.registerForm.get('password') as AbstractControl;
  }

  get cprControl(): AbstractControl {
    return this.registerForm.get('cpr') as AbstractControl;
  }

  get firstNameControl(): AbstractControl {
    return this.registerForm.get('firstName') as AbstractControl;
  }

  get lastNameControl(): AbstractControl {
    return this.registerForm.get('lastName') as AbstractControl;
  }
}
