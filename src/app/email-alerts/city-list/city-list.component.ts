import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CityListService } from '../city-list.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityList: string[];

  constructor(
    private cityListService: CityListService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.getCities();
    }
  }

  getCities() {
    this.cityListService.getCitiesSaved().subscribe(
      cities => {
        this.cityList = this.cityListService.currentCityList;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCity(city) {
    this.cityListService.removeCity(city);
  }
}
