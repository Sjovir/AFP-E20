import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyElementsModule } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitizenModule } from './components/citizen/citizen.module';
import { ComponentsModule } from './components/components.module';
import { InstallationModule } from './components/installation/installation.module';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { LoginWrapperComponent } from './webcomponents/login-wrapper/login-wrapper.component';
import { TopBarComponent } from './components/nav/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DigitOnlyDirective,
    LoginWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgbModule,
    LazyElementsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
