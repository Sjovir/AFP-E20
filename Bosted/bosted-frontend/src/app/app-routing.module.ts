import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenOverviewComponent } from './components/citizen/citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './components/citizen/container/citizen-container.component';
import { CitizenJournalComponent } from './components/citizen/journal/citizen-journal.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'citizen/:id',
    component: CitizenContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: CitizenOverviewComponent,
      },
      {
        path: 'journal',
        component: CitizenJournalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
