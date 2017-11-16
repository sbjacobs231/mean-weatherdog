import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CityListService } from '../city-list.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityList: string[];

  constructor(private cityListService: CityListService) {}

  ngOnInit() {
    this.getCities();
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
