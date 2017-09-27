import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

}
