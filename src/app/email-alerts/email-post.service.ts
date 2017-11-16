import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from '../auth/errors/error.service';

@Injectable()
export class EmailPostService {
  constructor(private http: Http, private errorService: ErrorService) {}
}
