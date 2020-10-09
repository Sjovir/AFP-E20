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
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access-token");
}

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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7000", "localhost:7100", "localhost:8000", "localhost:8100"]
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
