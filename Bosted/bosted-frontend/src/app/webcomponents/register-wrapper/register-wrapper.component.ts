import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'auth-register-wrapper',
  templateUrl: './register-wrapper.component.html',
  styleUrls: [],
})
export class RegisterWrapperComponent implements OnInit {
  link: string = `http://${environment.host}:8000/main.js`;

  @Input() dataToChild: string;
  @Output() dataFromChild = new EventEmitter<string>();
  listOfData: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  dataToParent($event: CustomEvent) {
    this.dataFromChild.emit($event.detail);
  }
}
