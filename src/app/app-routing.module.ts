import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ForecastComponent } from './forecast/forecast.component';
import { DailyComponent } from './forecast/daily/daily.component';
import { HourlyComponent } from './forecast/hourly/hourly.component';
import { TodayComponent } from './forecast/today/today.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth-guard.service';

import { ErrorComponent } from './auth/errors/error.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', component: LoginComponent, pathMatch: 'full'},
    { path: 'signup', component: RegisterComponent}
  ]},
  { path: 'forecast', component: ForecastComponent, canActivate: [AuthGuard], children: [
    { path: '', component: TodayComponent, pathMatch: 'full'},
    { path: 'daily', component: DailyComponent },
    { path: 'hourly', component: HourlyComponent }
  ]},
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
