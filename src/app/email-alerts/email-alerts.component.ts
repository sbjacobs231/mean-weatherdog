import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as WeatherLocationActions from '../forecast/store/location.actions';
import * as fromLocation from '../forecast/store/location.reducers';

@Component({
  selector: 'app-email-alerts',
  templateUrl: './email-alerts.component.html',
  styleUrls: ['./email-alerts.component.css']
})
export class EmailAlertsComponent implements OnInit {
  city: Observable<fromLocation.State>;

  constructor(private store: Store<fromLocation.AppState>) {}

  ngOnInit() {
    this.city = this.store.select('weatherLocation');
  }
}
