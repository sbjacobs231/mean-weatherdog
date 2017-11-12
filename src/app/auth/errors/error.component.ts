import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-error',
  template: '<h1>Page not found</h1>'
})
export class ErrorComponent implements OnInit {

  ngOnInit() {
    console.log('error page');
  }
}
