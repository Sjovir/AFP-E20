import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CitizenOverviewComponent } from './citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './container/citizen-container.component';
import { CitizenJournalComponent } from './journal/citizen-journal.component';
import { CitizenMenuComponent } from './menu/citizen-menu.component';
import { CitizenModalComponent } from './modals/citizen-modal/citizen-modal.component';

@NgModule({
  declarations: [
    CitizenJournalComponent,
    CitizenContainerComponent,
    CitizenMenuComponent,
    CitizenOverviewComponent,
    CitizenModalComponent,
  ],
  imports: [CommonModule, NgbModule, ReactiveFormsModule, RouterModule],
})
export class CitizenModule {}
