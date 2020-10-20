import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { Ordination } from 'src/app/models/ordination.model';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-edit-ordination',
  templateUrl: './edit-ordination.component.html',
  styleUrls: ['./edit-ordination.component.scss'],
})
export class EditOrdinationComponent implements OnInit {
  public editOrdinationForm: FormGroup;

  public ordination: Ordination;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = event.urlAfterRedirects;

        console.log(route);

        const ordinationId: string = route.split('/').pop();

        this.medicineService
          .getOrdination(ordinationId)
          .subscribe((ordination) => {
            this.ordination = ordination;
          });
      });
  }

  ngOnInit(): void {
    const ordinationEndDate = this.ordination.endDate;
    let endDate: NgbDateStruct;

    if (ordinationEndDate) {
      endDate = {
        year: ordinationEndDate.getUTCFullYear(),
        month: ordinationEndDate.getUTCMonth(),
        day: ordinationEndDate.getUTCDate(),
      };
    }

    const startDateAsString = this.datePipe.transform(
      this.ordination.startDate,
      'yyyy-MM-dd'
    );
    this.editOrdinationForm = this.formBuilder.group({
      drug: [this.ordination.drug.name, Validators.required],
      drugAmount: [this.ordination.drugAmount, Validators.required],
      drugUnit: [this.ordination.drugUnit, Validators.required],
      startDate: [startDateAsString, Validators.required],
      endDate: [endDate],
    });
  }

  public cancel() {
    // Implement redirect to correct page
    window.location.replace('overview');
  }

  public editOrdination() {
    const ordination: Ordination = this.editOrdinationForm.value;
    ordination.startDate = new Date(this.startDateControl.value);
    const endDate: NgbDateStruct = this.endDateControl.value;
    if (endDate) {
      ordination.endDate = new Date(
        endDate.year,
        endDate.month - 1,
        endDate.day
      );
    }

    this.medicineService.updateOrdination(ordination).subscribe(() => {
      // Implement redirect to correct page
      window.location.replace('overview');
    });
  }

  public get startDateControl(): AbstractControl {
    return this.editOrdinationForm.get('startDate');
  }

  public get endDateControl(): AbstractControl {
    return this.editOrdinationForm.get('endDate');
  }
}
