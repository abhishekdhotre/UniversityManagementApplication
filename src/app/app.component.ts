import {AfterViewChecked, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'app';
  color = 'primary';
  mode = 'indeterminate';
  showProgressSpinner = true;
  constructor() {  }

  ngAfterViewChecked(): void {
    setTimeout(
      () => {
        this.showProgressSpinner = false;
      }, 1500
    );
  }
}
