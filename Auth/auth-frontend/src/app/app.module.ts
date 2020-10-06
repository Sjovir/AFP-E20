import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const local = false;

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [local ? AppComponent : []],
})
export class AppModule {
  constructor(private injector: Injector) {
    const microLogin = createCustomElement(LoginComponent, { injector });
    const microRegister = createCustomElement(RegisterComponent, { injector });

    customElements.define('micro-login', microLogin);
    customElements.define('micro-register', microRegister);
  }
}
