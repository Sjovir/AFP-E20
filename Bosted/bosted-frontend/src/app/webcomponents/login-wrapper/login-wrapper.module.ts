import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyElementsModule } from '@angular-extensions/elements';

@NgModule({
  declarations: [],
  imports: [CommonModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginWrapperModule {}
