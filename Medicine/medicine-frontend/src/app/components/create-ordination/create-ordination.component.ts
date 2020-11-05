import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Drug } from 'src/app/models/drug.model';
import { Ordination } from 'src/app/models/ordination.model';
import { DrugService } from 'src/app/services/drug.service';
import { LocationService } from 'src/app/services/location.service';
import { OrdinationService } from 'src/app/services/ordination.service';
import {
  Permission,
  PermissionService,
} from 'src/app/services/permission.service';

@Component({
  selector: 'app-create-ordination',
  templateUrl: './create-ordination.component.html',
  styleUrls: ['./create-ordination.component.scss'],
})
export class CreateOrdinationComponent implements OnInit {
  public permMedicineEdit: boolean;

  public createOrdinationForm: FormGroup;

  public drugs: Drug[];
  public drugUnits: string[];

  constructor(
    private calendar: NgbCalendar,
    private drugService: DrugService,
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

    this.drugService.getDrugs().subscribe((drugs) => {
      this.drugs = drugs;
    });

    this.drugService.getDrugUnits().subscribe((drugUnits) => {
      this.drugUnits = drugUnits;
    });

    this.createOrdinationForm = this.formBuilder.group({
      drug: ['', Validators.required],
      drugAmount: ['', Validators.required],
      drugUnit: ['', Validators.required],
      startDate: [this.calendar.getToday(), Validators.required],
      endDate: [null],
    });
  }

  public cancel() {
    this.locationService.redirect('overview');
  }

  public createOrdination() {
    const url = window.location.href;
    const urlSplit: string[] = url.split('/');

    const citizenStringIndex: number = urlSplit.indexOf('citizen');
    const citizenId: string = urlSplit[citizenStringIndex + 1];

    const ordination: Ordination = this.createOrdinationForm.value;
    const startDate: NgbDateStruct = this.startDateControl.value;
    ordination.startDate = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day
    );

    const endDate: NgbDateStruct = this.endDateControl.value;
    if (endDate) {
      ordination.endDate = new Date(
        endDate.year,
        endDate.month - 1,
        endDate.day
      );
    }

    this.ordinationService
      .createOrdination(citizenId, ordination)
      .subscribe(() => {
        this.locationService.redirect('overview');
      });
  }

  public get drugControl(): AbstractControl {
    return this.createOrdinationForm.get('drug');
  }

  public get drugAmountControl(): AbstractControl {
    return this.createOrdinationForm.get('drugAmount');
  }

  public get drugUnitControl(): AbstractControl {
    return this.createOrdinationForm.get('drugUnit');
  }

  public get startDateControl(): AbstractControl {
    return this.createOrdinationForm.get('startDate');
  }

  public get endDateControl(): AbstractControl {
    return this.createOrdinationForm.get('endDate');
  }
}
