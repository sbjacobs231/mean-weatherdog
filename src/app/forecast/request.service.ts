import { Injectable, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromLocation from './store/location.reducers';
import * as WeatherLocationActions from './store/location.actions';

@Injectable()
export class RequestService implements OnInit {

  constructor(private http: HttpClient,
              private store: Store<fromLocation.AppState>,
              private router: Router) {}

  ngOnInit() {
  }

  convertMilitaryTime(data) {
    if (data.hour > 12) {
      data.hour -= 12;
    }
    return data;
  }

  getDailyForecast(address, zmw) {
    this.store.dispatch(new WeatherLocationActions.UpdateLocation(address)); // Update State for tracking
    this.store.dispatch(new WeatherLocationActions.UpdateCode(zmw));
    this.store.dispatch(new WeatherLocationActions.UpdateAutoResults([])); // Empty Autocomplete Results to rid of dropdown
    return this.http.get(`https://api.wunderground.com/api/47be6887c60a72bf/forecast10day/hourly/astronomy/conditions/alerts${zmw}.json`)
      .subscribe(
        data => {
          console.log('data passed');
          const dayCast = data['forecast']['simpleforecast']['forecastday'];
          this.store.dispatch(new WeatherLocationActions.UpdateDailyArray(dayCast));
          const hourlyCast = data['hourly_forecast'];
          this.store.dispatch(new WeatherLocationActions.UpdateHourlyArray(hourlyCast));
          const sunrise = data['sun_phase']['sunrise'];
          this.store.dispatch(new WeatherLocationActions.UpdateSunrise(sunrise));
          // sunset
          const sunset = data['sun_phase']['sunset'];
          const convertSunset = this.convertMilitaryTime(sunset);
          this.store.dispatch(new WeatherLocationActions.UpdateSunset(convertSunset));
          const wind = data['current_observation']['wind_mph'];
          this.store.dispatch(new WeatherLocationActions.Wind(wind));
          const country = data['current_observation']['display_location']['country'];
          this.store.dispatch(new WeatherLocationActions.UpdateCountry(country));
          const alerts = data['alerts'];
          this.store.dispatch(new WeatherLocationActions.UpdateAlerts(alerts));
        },
        error => {
          console.log('error passed');
          console.log(error);
        }
      );
  }
}
