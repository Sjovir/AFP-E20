import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Drug } from 'src/app/models/drug.model';
import { Ordination } from 'src/app/models/ordination.model';
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
    private formBuilder: FormBuilder,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.medicineService.getDrugs().subscribe((drugs) => {
      this.drugs = drugs;
    });

    this.medicineService.getDrugUnits().subscribe((drugUnits) => {
      this.drugUnits = drugUnits;
    });

    const today: Date = new Date();

    const dateStruct: NgbDateStruct = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDay(),
    };

    this.createOrdinationForm = this.formBuilder.group({
      drug: ['', Validators.required],
      drugAmount: ['', Validators.required],
      drugUnit: ['', Validators.required],
      startDate: [dateStruct, Validators.required],
      endDate: [null],
    });
  }

  public cancel() {
    // Implement redirect to correct page
    window.location.replace('overview');
  }

  public createOrdination() {
    const ordination: Ordination = this.createOrdinationForm.value;

    this.medicineService.createOrdination(ordination).subscribe(() => {
      // Implement redirect to correct page
      window.location.replace('overview');
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
