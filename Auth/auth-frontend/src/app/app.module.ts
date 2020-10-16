import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectInstallationComponent } from './select-installation/select-installation.component';

export function tokenGetter() {
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SelectInstallationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          'localhost:7000',
          'localhost:7100',
          'localhost:8000',
          'localhost:8100',
        ],
      },
    }),
  ],
  providers: [],
  bootstrap: [environment.local ? AppComponent : []],
})
export class AppModule {
  constructor(private injector: Injector) {
    const microLogin = createCustomElement(LoginComponent, { injector });
    const microRegister = createCustomElement(RegisterComponent, { injector });
    const microSelectInstallation = createCustomElement(
      SelectInstallationComponent,
      { injector }
    );

    customElements.define('micro-login', microLogin);
    customElements.define('micro-register', microRegister);
    customElements.define('micro-select-installation', microSelectInstallation);
  }
}
