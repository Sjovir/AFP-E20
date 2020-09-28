import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitizenModule } from './components/citizen/citizen.module';
import { ComponentsModule } from './components/components.module';
import { TopBarComponent } from './components/nav/top-bar/top-bar.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  declarations: [AppComponent, TopBarComponent, DigitOnlyDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    CitizenModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
