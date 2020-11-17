import { LazyElementsModule } from '@angular-extensions/elements';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SelectInstallationWrapperComponent } from './select-installation-wrapper.component';

@NgModule({
  declarations: [SelectInstallationWrapperComponent],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SelectInstallationWrapperComponent],
})
export class SelectInstallationWrapperModule {}
