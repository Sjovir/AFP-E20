import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { CreateOrdinationComponent } from './create-ordination/create-ordination.component';
import { EditOrdinationComponent } from './edit-ordination/edit-ordination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OverviewComponent,
    CreateOrdinationComponent,
    EditOrdinationComponent,
  ],
  imports: [CommonModule, NgbDatepickerModule, ReactiveFormsModule],
})
export class ComponentsModule {}
