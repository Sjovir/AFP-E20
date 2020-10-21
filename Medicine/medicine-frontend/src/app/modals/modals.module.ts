import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCitizenModalComponent } from './edit-citizen-modal/edit-citizen-modal.component';

@NgModule({
  declarations: [EditCitizenModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModalsModule {}
