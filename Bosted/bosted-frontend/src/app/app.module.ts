import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitizenModule } from './components/citizen/citizen.module';
import { ComponentsModule } from './components/components.module';
import { TopBarComponent } from './components/nav/top-bar/top-bar.component';

@NgModule({
  declarations: [AppComponent, TopBarComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, CitizenModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
