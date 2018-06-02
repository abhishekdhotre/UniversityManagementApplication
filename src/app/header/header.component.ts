import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() navBarClickEvent = new EventEmitter<{navHeader: string}>();
  constructor() { }

  ngOnInit() {
  }

}