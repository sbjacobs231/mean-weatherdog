import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class CityListService {
  userId = localStorage.getItem('userId');
  url = `http://localhost:3000/api/users/${this.userId}`;
  currentCityList: string[];

  constructor(private http: Http) {}

  getCitiesSaved(): Observable<string[]> {
    return this.http.get(this.url).map((data: Response) => {
      this.currentCityList = data.json().cityAlerts;
      return data.json().cityAlerts;
    });
  }

  addCity(cityName) {
    let cityArr = this.currentCityList;
    cityArr.push(cityName);
    const body = {
      id: this.userId,
      cityAlerts: cityArr
    };
    console.log('front end triggered');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.url, JSON.stringify(body), { headers: headers });
    // .map(res => {
    //   return res.json();
    // });
  }
}
