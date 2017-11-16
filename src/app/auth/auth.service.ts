import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { ErrorService } from './errors/error.service';

@Injectable()
export class AuthService {
  constructor(
    private http: Http,
    private router: Router,
    private errorService: ErrorService
  ) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post('http://localhost:3000/api/users', body, { headers: headers })
    return this.http
      .post(
        'http://weatherdog.us-east-2.elasticbeanstalk.com/api/users',
        body,
        { headers: headers }
      )
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleSignupError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post('http://localhost:3000/api/users/signin', body, {headers: headers})
    return this.http
      .post(
        'http://weatherdog.us-east-2.elasticbeanstalk.com/api/users/signin',
        body,
        { headers: headers }
      )
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleSigninError(error.json());
        return Observable.throw(error.json());
      });
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    this.router.navigateByUrl('/');
    localStorage.clear();
  }
}
