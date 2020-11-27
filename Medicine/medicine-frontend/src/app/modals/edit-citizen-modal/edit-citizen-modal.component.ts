import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/models/alert.model';
import { Citizen } from 'src/app/models/citizen.model';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'app-edit-citizen-modal',
  templateUrl: './edit-citizen-modal.component.html',
})
export class EditCitizenModalComponent implements OnInit, OnDestroy {
  @Input() citizen: Citizen;

  public editCitizenForm: FormGroup;

  public totalEditing: number = 1;
  public alert: Alert;

  public totalEditingTooltip: string;

  private citizenEvent: { unsubscribe(): void };

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.editCitizenForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      cpr: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });

    this.editCitizenForm.patchValue(this.citizen);

    this.citizenEvent = this.sseService
      .editCitizenEvents(this.citizen.id)
      .subscribe((event) => {
        const json = JSON.parse(event.data);

        switch (json.event) {
          case 'USER_CHANGE':
            this.totalEditing = json.data.total;
            this.updateTooltip();
            break;
          case 'CITIZEN_UPDATE':
            this.alert = {
              type: 'warning',
              message: 'Denne borger er blevet opdateret',
            };
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.citizenEvent.unsubscribe();
  }

  public dismiss() {
    this.activeModal.dismiss('Cancel click');
  }

  public close() {
    let citizen: Citizen = this.editCitizenForm.value;
    citizen.id = this.citizen.id;
    this.activeModal.close(citizen);
  }

  public closeAlert() {
    this.alert = null;
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

  private updateTooltip(): void {
    if (this.totalEditing === 2) {
      this.totalEditingTooltip = `
        ${this.totalEditing - 1} anden bruger redigerer denne borger
      `;
    } else if (this.totalEditing > 2) {
      this.totalEditingTooltip = `
        ${this.totalEditing - 1} andre brugere redigerer denne borger
      `;
    }
  }
}
