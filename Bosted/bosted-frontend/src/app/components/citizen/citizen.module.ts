import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitizenOverviewComponent } from './citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './container/citizen-container.component';
import { CitizenJournalComponent } from './journal/citizen-journal.component';
import { CitizenMenuComponent } from './menu/citizen-menu.component';
import { EditCitizenModalComponent } from './modals/edit-citizen-modal/edit-citizen-modal.component';

@NgModule({
  declarations: [
    CitizenJournalComponent,
    CitizenContainerComponent,
    CitizenMenuComponent,
    CitizenOverviewComponent,
    EditCitizenModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class CitizenModule {}
