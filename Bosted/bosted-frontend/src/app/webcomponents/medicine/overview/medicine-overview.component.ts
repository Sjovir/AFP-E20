import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'medicine-overview',
  templateUrl: './medicine-overview.component.html',
})
export class MedicineOverviewComponent implements OnInit {
  link: string = 'http://localhost:8200/main.js';

  @Input() dataToChild: string;
  @Output() dataFromChild = new EventEmitter<string>();
  listOfData: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  dataToParent($event: CustomEvent) {
    this.dataFromChild.emit($event.detail);
  }
}
