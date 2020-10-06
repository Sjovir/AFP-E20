import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyElementsModule } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { LoginWrapperModule } from './webcomponents/login-wrapper/login-wrapper.module';
import { RegisterWrapperModule } from './webcomponents/register-wrapper/register-wrapper.module';

@NgModule({
  declarations: [AppComponent, DigitOnlyDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgbModule,
    LazyElementsModule,
    LoginWrapperModule,
    RegisterWrapperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
