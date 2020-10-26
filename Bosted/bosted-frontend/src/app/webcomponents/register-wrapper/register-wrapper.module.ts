import { LazyElementsModule } from '@angular-extensions/elements';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RegisterWrapperComponent } from './register-wrapper.component';

@NgModule({
  declarations: [RegisterWrapperComponent],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RegisterWrapperComponent],
})
export class RegisterWrapperModule {}
