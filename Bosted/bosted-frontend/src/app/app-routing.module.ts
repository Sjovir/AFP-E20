import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenOverviewComponent } from './components/citizen/citizen-overview/citizen-overview.component';
import { CitizenContainerComponent } from './components/citizen/container/citizen-container.component';
import { CitizenJournalComponent } from './components/citizen/journal/citizen-journal.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginWrapperComponent } from './webcomponents/login-wrapper/login-wrapper.component';
import { RegisterWrapperComponent } from './webcomponents/register-wrapper/register-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'installation/null',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginWrapperComponent },
  { path: 'register', component: RegisterWrapperComponent },
  { path: 'installation', redirectTo: 'installation/null', pathMatch: 'full' },
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
    ],
  },
  { path: '**', redirectTo: 'installation/null' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
