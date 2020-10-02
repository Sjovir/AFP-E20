import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auth-register-wrapper',
  templateUrl: './register-wrapper.component.html',
  styleUrls: [],
})
export class RegisterWrapperComponent implements OnInit {
  link: string = 'http://localhost:4000/main.js';

  @Input() dataToChild: string;
  @Output() dataFromChild = new EventEmitter<string>();
  listOfData: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  dataToParent($event: CustomEvent) {
    this.dataFromChild.emit($event.detail);
  }
}
