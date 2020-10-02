import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallationModalComponent } from './modals/installation-modal/installation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InstallationModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class InstallationModule {}
