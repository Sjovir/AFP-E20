import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrdinationComponent } from './components/create-ordination/create-ordination.component';
import { EditOrdinationComponent } from './components/edit-ordination/edit-ordination.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'create-ordination', component: CreateOrdinationComponent },
  { path: 'edit-ordination', component: EditOrdinationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
