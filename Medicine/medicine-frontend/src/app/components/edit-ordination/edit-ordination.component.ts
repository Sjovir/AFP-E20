import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Ordination } from 'src/app/models/ordination.model';
import { LocationService } from 'src/app/services/location.service';
import { OrdinationService } from 'src/app/services/ordination.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';

@Component({
  selector: 'app-edit-ordination',
  templateUrl: './edit-ordination.component.html',
  styleUrls: ['./edit-ordination.component.scss'],
})
export class EditOrdinationComponent implements OnInit {
  public permMedicineEdit: boolean;

  public editOrdinationForm: FormGroup;

  public citizenId: string;
  public ordination: Ordination;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private permissionService: PermissionService,
    private ordinationService: OrdinationService
  ) {}

  ngOnInit(): void {
    this.permMedicineEdit = this.permissionService.hasPermissions(
      Permission.MEDICINE_EDIT
    );
    if (!this.permMedicineEdit) return;

    const url = window.location.href;
    const urlSplit: string[] = url.split('/');

    const citizenStringIndex: number = urlSplit.indexOf('citizen');
    this.citizenId = urlSplit[citizenStringIndex + 1];

    const ordinationStringIndex: number = urlSplit.indexOf('edit-ordination');
    const ordinationId: string = urlSplit[ordinationStringIndex + 1];

    this.ordinationService
      .getOrdination(this.citizenId, ordinationId)
      .subscribe((ordination) => {
        let endDate: NgbDateStruct;

        if (ordination.endDate) {
          const ordinationEndDate = new Date(ordination.endDate);
          endDate = {
            year: ordinationEndDate.getUTCFullYear(),
            month: ordinationEndDate.getUTCMonth() + 1,
            day: ordinationEndDate.getUTCDate() + 1,
          };
        }

        const startDateAsString = this.datePipe.transform(
          ordination.startDate,
          'yyyy-MM-dd'
        );
        this.editOrdinationForm = this.formBuilder.group({
          drug: [ordination.drug.name, Validators.required],
          drugAmount: [ordination.drugAmount, Validators.required],
          drugUnit: [ordination.drugUnit, Validators.required],
          startDate: [startDateAsString, Validators.required],
          endDate: [endDate],
        });

        this.ordination = ordination;
      });
  }

  public cancel() {
    this.locationService.redirect('overview');
  }

  public editOrdination() {
    const ordination: Ordination = this.editOrdinationForm.value;
    ordination.id = this.ordination.id;
    ordination.drug = this.ordination.drug;
    ordination.startDate = new Date(this.startDateControl.value);

    const endDate: NgbDateStruct = this.endDateControl.value;
    if (endDate) {
      ordination.endDate = new Date(
        endDate.year,
        endDate.month - 1,
        endDate.day
      );
    }

    this.ordinationService
      .updateOrdination(this.citizenId, ordination)
      .subscribe(() => {
        this.locationService.redirect('overview');
      });
  }

  public get startDateControl(): AbstractControl {
    return this.editOrdinationForm.get('startDate');
  }

  public get endDateControl(): AbstractControl {
    return this.editOrdinationForm.get('endDate');
  }
}
