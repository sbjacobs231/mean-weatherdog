import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromLocation from '../store/location.reducers';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  today: Observable<fromLocation.State>;
  time: number = Date.now();

  constructor(private store: Store<fromLocation.AppState>) { }

  ngOnInit() {
    this.today = this.store.select('weatherLocation');
  }
}
