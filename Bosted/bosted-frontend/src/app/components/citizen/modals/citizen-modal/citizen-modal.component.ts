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
  selector: 'citizen-modal',
  templateUrl: './citizen-modal.component.html',
  styleUrls: ['./citizen-modal.component.scss'],
})
export class CitizenModalComponent implements OnInit {
  @Input() modalType: 'create' | 'edit';
  @Input() citizen?: Citizen;

  public editCitizenForm: FormGroup;
  public titleByType = {
    create: 'Opret borger',
    edit: 'Rediger borger',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editCitizenForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', Validators.minLength(2)],
      cpr: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });

    if (this.citizen) this.editCitizenForm.patchValue(this.citizen);
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
