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
  public registerForm: FormGroup;

  constructor(
    private formBuiler: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuiler.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpr: ['', Validators.required],
      firstName: [''],
      lastName: [''],
    });
  }

  async onSubmit(): Promise<void> {
    // [disabled]="!registerForm.valid"
    console.log(this.registerForm);

    const { email, password, cpr } = this.registerForm.value;

    await this.authService.register(
      'dennis@hotmail.com',
      'fronttest',
      '0011223344'
    );
  }

  get emailControl(): AbstractControl {
    return this.registerForm.get('email') as AbstractControl;
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
