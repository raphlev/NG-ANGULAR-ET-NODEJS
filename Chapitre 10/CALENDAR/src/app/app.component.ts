import { Component, OnChanges } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  "../../node_modules/primeng/resources/themes/omega/theme.css",
  "../../node_modules/font-awesome/css/font-awesome.min.css",
  "../../node_modules/primeng/resources/primeng.min.css"
  ]
})
export class AppComponent {
  private date: Date;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: {[date: Date]: SimpleChange}) {
     console.log(changes['date'].currentValue);
  }

}
