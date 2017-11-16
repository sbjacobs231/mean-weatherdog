import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from '../auth/errors/error.service';

@Injectable()
export class CityListService {
  userId = localStorage.getItem('userId');
  url = `http://localhost:3000/api/users/${this.userId}`;
  currentCityList: string[];

  constructor(private http: Http, private errorService: ErrorService) {}

  getCitiesSaved(): Observable<string[]> {
    return this.http.get(this.url).map((data: Response) => {
      this.currentCityList = data.json().cityAlerts;
      return data.json().cityAlerts;
    });
  }

  addCity(cityName) {
    let cityArr = this.currentCityList;
    if (cityArr.indexOf(cityName) > -1) {
      return; // end function here if user tries adding item that already exists in array
    } else {
      cityArr.push(cityName);
    }
    this.currentCityList = cityArr;
    const body = JSON.stringify({
      id: this.userId,
      cityAlerts: cityArr
    });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .put(this.url, body, { headers: headers })
      .subscribe((response: Response) => {
        return response.json();
      });
  }

  removeCity(cityName) {
    let cityArr = this.currentCityList;
    const cityIdx = cityArr.indexOf(cityName);
    cityArr.splice(cityIdx, 1);
    this.currentCityList = cityArr;
    const body = JSON.stringify({
      id: this.userId,
      cityAlerts: cityArr
    });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .put(this.url, body, { headers: headers })
      .subscribe((response: Response) => {
        return response.json();
      });
  }
}
