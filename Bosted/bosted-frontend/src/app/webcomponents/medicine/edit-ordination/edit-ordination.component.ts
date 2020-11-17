import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'edit-ordination',
  templateUrl: './edit-ordination.component.html',
})
export class EditOrdinationComponent implements OnInit {
  link: string = `http://${environment.host}:8200/main.js`;

  @Input() dataToChild: string;
  @Output() dataFromChild = new EventEmitter<string>();
  listOfData: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  dataToParent($event: CustomEvent) {
    this.dataFromChild.emit($event.detail);
  }
}
