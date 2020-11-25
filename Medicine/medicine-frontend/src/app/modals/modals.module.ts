import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditCitizenModalComponent } from './edit-citizen-modal/edit-citizen-modal.component';

@NgModule({
  declarations: [EditCitizenModalComponent],
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
})
export class ModalsModule {}
