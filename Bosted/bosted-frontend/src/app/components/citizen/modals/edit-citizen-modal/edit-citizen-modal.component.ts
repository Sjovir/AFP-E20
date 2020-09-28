import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Citizen } from 'src/app/models/citizen.model';

@Component({
  selector: 'edit-citizen-modal',
  templateUrl: './edit-citizen-modal.component.html',
  styleUrls: ['./edit-citizen-modal.component.scss'],
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
      firstname: ['', Validators.required],
      lastname: [''],
      cpr: ['', Validators.required],
    });

    this.editCitizenForm.patchValue(this.citizen);
  }

  public dismiss() {
    this.activeModal.dismiss('Cancel click');
  }

  public close() {
    this.activeModal.close(this.editCitizenForm.value);
  }

  public get firstnameControl(): AbstractControl {
    return this.editCitizenForm.get('firstname');
  }

  public get lastnameControl(): AbstractControl {
    return this.editCitizenForm.get('lastname');
  }

  public get cprControl(): AbstractControl {
    return this.editCitizenForm.get('cpr');
  }
}
