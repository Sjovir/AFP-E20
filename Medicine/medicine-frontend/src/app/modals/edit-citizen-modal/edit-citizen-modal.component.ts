import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';

@Component({
  selector: 'app-edit-citizen-modal',
  templateUrl: './edit-citizen-modal.component.html',
})
export class EditCitizenModalComponent implements OnInit {
  @Input() citizen: Citizen;

  public editCitizenForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editCitizenForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      cpr: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });

    this.editCitizenForm.patchValue(this.citizen);
  }

  public dismiss() {
    this.activeModal.dismiss('Cancel click');
  }

  public close() {
    let citizen: Citizen = this.editCitizenForm.value;
    citizen.id = this.citizen.id;
    this.activeModal.close(citizen);
  }

  public get firstNameControl(): AbstractControl {
    return this.editCitizenForm.get('firstName');
  }

  public get lastNameControl(): AbstractControl {
    return this.editCitizenForm.get('lastName');
  }

  public get cprControl(): AbstractControl {
    return this.editCitizenForm.get('cpr');
  }
}
