import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitizenModule } from './components/citizen/citizen.module';
import { ComponentsModule } from './components/components.module';
import { InstallationModule } from './components/installation/installation.module';
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  declarations: [AppComponent, DigitOnlyDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
