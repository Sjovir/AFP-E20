import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyElementsModule } from '@angular-extensions/elements';

import { RegisterWrapperComponent } from './register-wrapper.component';

@NgModule({
  declarations: [RegisterWrapperComponent],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RegisterWrapperComponent],
})
export class RegisterWrapperModule {}
