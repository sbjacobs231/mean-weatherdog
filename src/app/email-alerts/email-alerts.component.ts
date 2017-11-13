import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as WeatherLocationActions from '../forecast/store/location.actions';
import * as fromLocation from '../forecast/store/location.reducers';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-email-alerts',
  templateUrl: './email-alerts.component.html',
  styleUrls: ['./email-alerts.component.css']
})
export class EmailAlertsComponent implements OnInit {
  city: Observable<fromLocation.State>;

  constructor(
    private store: Store<fromLocation.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.city = this.store.select('weatherLocation');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  postCity() {
    console.log('post city');
  }
}
