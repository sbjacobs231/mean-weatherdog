import { EventEmitter} from '@angular/core';

import { Error } from './error.model';

export class ErrorService {
  errorSignin= new EventEmitter<Error>();
  errorSignup = new EventEmitter<Error>();

  handleSigninError(error: any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorSignin.emit(errorData);
  }

  handleSignupError(error: any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorSignup.emit(errorData);
  }

}
