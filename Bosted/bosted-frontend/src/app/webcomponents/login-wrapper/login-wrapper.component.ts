import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// https://medium.com/@rohitsaxena_97625/angular-angular-micro-frontend-part-of-adventures-in-micro-frontend-series-part-2-9e3c3f0bfc0c

@Component({
  selector: 'auth-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: [],
})
export class LoginWrapperComponent implements OnInit {
  link: string = 'http://localhost:7000/main.js';

  @Input() dataToChild: string;
  @Output() dataFromChild = new EventEmitter<string>();
  listOfData: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  dataToParent($event: CustomEvent) {
    this.dataFromChild.emit($event.detail);
  }
}
