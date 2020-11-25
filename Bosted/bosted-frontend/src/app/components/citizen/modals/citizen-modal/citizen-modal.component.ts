import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { Alert } from 'src/app/models/alert.model';
import { Citizen } from 'src/app/models/citizen.model';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'citizen-modal',
  templateUrl: './citizen-modal.component.html',
})
export class CitizenModalComponent implements OnInit {
  @Input() modalType: 'create' | 'edit';
  @Input() citizen?: Citizen;

  public totalEditing: number = 1;
  public alert: Alert;

  public totalEditingTooltip: string;

  private citizenEvent: { unsubscribe(): void };

  public editCitizenForm: FormGroup;
  public titleByType = {
    create: 'Opret borger',
    edit: 'Rediger borger',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.editCitizenForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      cpr: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });

    if (this.citizen) this.editCitizenForm.patchValue(this.citizen);

    this.citizenEvent = this.sseService
      .editCitizenEvents(this.citizen.id)
      .subscribe(
        (event) => {
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
        }
      );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.citizenEvent.unsubscribe();
      });
  }

  public dismiss() {
    this.citizenEvent.unsubscribe();
    this.activeModal.dismiss('Cancel click');
  }

  public close() {
    this.citizenEvent.unsubscribe();
    this.activeModal.close(this.editCitizenForm.value);
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
