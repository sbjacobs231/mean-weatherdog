import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AutocompleteService } from './autocomplete.service';
import { RequestService } from './request.service';
import { ClickValueService } from './searchdrop/click-value.service';
import * as WeatherLocationActions from './store/location.actions';
import * as fromLocation from './store/location.reducers';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  providers: []
})
export class ForecastComponent implements OnInit {
  @ViewChild('autocomplete') private inputSearch: ElementRef;
  address: Observable<fromLocation.State>;
  inputValue: any;

  constructor(
    private store: Store<fromLocation.AppState>,
    private autocompleteService: AutocompleteService,
    private requestService: RequestService,
    private clickValueService: ClickValueService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.address = this.store.select('weatherLocation');
    this.requestService.getDailyForecast(
      'San Francisco, CA',
      '/q/zmw:94102.1.99999'
    );
    this.clickValueService.searchValue.subscribe(data => {
      this.inputValue = data;
    });
    this.inputSearch.nativeElement.focus();
  }

  runAutocomplete(userInput) {
    this.autocompleteService.autocomplete(userInput);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
