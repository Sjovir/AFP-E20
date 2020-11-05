import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CitizenModule } from './citizen/citizen.module';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './nav/top-bar/top-bar.component';

@NgModule({
  declarations: [HomeComponent, TopBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    CitizenModule,
  ],
  exports: [TopBarComponent],
})
export class ComponentsModule {}
