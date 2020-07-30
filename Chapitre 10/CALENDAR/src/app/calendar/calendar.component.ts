import { Component, OnInit } from '@angular/core';

import {CalendarModule} from 'primeng/primeng';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css',
  "../../../node_modules/primeng/resources/themes/omega/theme.css",
  "../../../node_modules/font-awesome/css/font-awesome.min.css",
  "../../../node_modules/primeng/resources/primeng.min.css"
  ]
})
export class CalendarComponent implements OnInit {
       date: Date;

   ngOnInit() { }
}
