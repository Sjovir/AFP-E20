import { LazyElementsModule } from '@angular-extensions/elements';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateOrdinationComponent } from './create-ordination/create-ordination.component';
import { EditOrdinationComponent } from './edit-ordination/edit-ordination.component';
import { MedicineOverviewComponent } from './overview/medicine-overview.component';

@NgModule({
  declarations: [
    CreateOrdinationComponent,
    MedicineOverviewComponent,
    EditOrdinationComponent,
  ],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CreateOrdinationComponent, MedicineOverviewComponent],
})
export class MedicineModule {}
