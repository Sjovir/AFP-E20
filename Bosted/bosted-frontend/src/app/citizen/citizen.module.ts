import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { JournalComponent } from './journal/journal.component';



@NgModule({
  declarations: [BasicComponent, JournalComponent],
  imports: [
    CommonModule
  ]
})
export class CitizenModule { }
