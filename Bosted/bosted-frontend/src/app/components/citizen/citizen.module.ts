import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CitizenOverviewComponent } from './citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './container/citizen-container.component';
import { CitizenJournalComponent } from './journal/citizen-journal.component';
import { CitizenMenuComponent } from './menu/citizen-menu.component';

@NgModule({
  declarations: [
    CitizenJournalComponent,
    CitizenContainerComponent,
    CitizenMenuComponent,
    CitizenOverviewComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class CitizenModule {}
