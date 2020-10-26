import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Drug } from 'src/app/models/drug.model';
import { Ordination } from 'src/app/models/ordination.model';
import { LocationService } from 'src/app/services/location.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-create-ordination',
  templateUrl: './create-ordination.component.html',
  styleUrls: ['./create-ordination.component.scss'],
})
export class CreateOrdinationComponent implements OnInit {
  public createOrdinationForm: FormGroup;

  public drugs: Drug[];
  public drugUnits: string[];

  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.medicineService.getDrugs().subscribe((drugs) => {
      this.drugs = drugs;
    });

    this.medicineService.getDrugUnits().subscribe((drugUnits) => {
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
    const ordination: Ordination = this.createOrdinationForm.value;

    const url = window.location.href;
    const urlSplit: string[] = url.split('/');

    const citizenStringIndex: number = urlSplit.indexOf('citizen');
    const citizenId: string = urlSplit[citizenStringIndex + 1];

    this.medicineService.createOrdination(citizenId, ordination).subscribe(() => {
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
