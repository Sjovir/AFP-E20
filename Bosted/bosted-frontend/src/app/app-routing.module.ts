import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenOverviewComponent } from './components/citizen/citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './components/citizen/container/citizen-container.component';
import { CitizenJournalComponent } from './components/citizen/journal/citizen-journal.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginWrapperComponent } from './webcomponents/login-wrapper/login-wrapper.component';
import { CreateOrdinationComponent } from './webcomponents/medicine/create-ordination/create-ordination.component';
import { EditOrdinationComponent } from './webcomponents/medicine/edit-ordination/edit-ordination.component';
import { MedicineOverviewComponent } from './webcomponents/medicine/overview/medicine-overview.component';
import { RegisterWrapperComponent } from './webcomponents/register-wrapper/register-wrapper.component';
import { SelectInstallationWrapperComponent } from './webcomponents/select-installation-wrapper/select-installation-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-installation',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginWrapperComponent },
  { path: 'register', component: RegisterWrapperComponent },
  {
    path: 'select-installation',
    component: SelectInstallationWrapperComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'installation',
    redirectTo: 'select-installation',
    pathMatch: 'full',
  },
  {
    path: 'installation/null',
    redirectTo: 'select-installation',
    pathMatch: 'full',
  },
  {
    path: 'installation/:installationId',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'installation/:installationId/citizen/:id',
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
        canActivate: [AuthGuard],
      },
      {
        path: 'journal',
        component: CitizenJournalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'medicine',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            component: MedicineOverviewComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'create-ordination',
            component: CreateOrdinationComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-ordination/:ordinationId',
            component: EditOrdinationComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'installation/null' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
