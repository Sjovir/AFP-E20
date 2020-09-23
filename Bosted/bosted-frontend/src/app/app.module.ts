import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { MenuComponent } from './components/nav/menu/menu.component';
import { TopBarComponent } from './components/nav/top-bar/top-bar.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, TopBarComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
