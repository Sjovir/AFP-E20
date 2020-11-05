import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyElementsModule } from '@angular-extensions/elements';

import { LoginWrapperComponent } from './login-wrapper.component';

@NgModule({
  declarations: [LoginWrapperComponent],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginWrapperComponent],
})
export class LoginWrapperModule {}
