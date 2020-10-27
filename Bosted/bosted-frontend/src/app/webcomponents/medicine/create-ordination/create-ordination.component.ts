import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-ordination',
  templateUrl: './create-ordination.component.html',
})
export class CreateOrdinationComponent implements OnInit {
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
