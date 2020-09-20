import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
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
    private formBuiler: FormBuilder,
    private authService: AuthService
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

    try {
      await this.authService.register(
        username,
        password,
        cpr,
        firstName,
        lastName
      );

      this.onSubmitMessage = `Account ${username} has been created.`;
      this.onSubmitStatus = 0;
    } catch (err) {
      this.onSubmitMessage = err.message;
      this.onSubmitStatus = 1;
    }
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
