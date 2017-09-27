import { Action } from '@ngrx/store';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_CODE = 'UPDATE_CODE';
export const UPDATE_LATITUDE = 'UPDATE_LATITUDE';
export const UPDATE_LONGITUDE = 'UPDATE_LONGITUDE';
export const UPDATE_DAILY_ARRAY = 'UPDATE_DAILY_ARRAY';
export const UPDATE_HOURLY_ARRAY = 'UPDATE_HOURLY_ARRAY';
export const UPDATE_AUTO_RESULTS = 'UPDATE_AUTO_RESULTS';
export const UPDATE_SUNRISE = 'UPDATE_SUNRISE';
export const UPDATE_SUNSET = 'UPDATE_SUNSET';
export const WIND = 'WIND';
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';
export const UPDATE_ALERTS = 'UPDATE_ALERTS';

export class UpdateLocation implements Action {
  readonly type = UPDATE_LOCATION;

  constructor(public payload: string) {}
}

export class UpdateCode implements Action {
  readonly type = UPDATE_CODE;

  constructor(public payload: string) {}
}

export class UpdateLatitude implements Action {
  readonly type = UPDATE_LATITUDE;

  constructor(public payload: string) {}
}

export class UpdateLongitude implements Action {
  readonly type = UPDATE_LONGITUDE;

  constructor(public payload: string) {}
}

export class UpdateDailyArray implements Action {
  readonly type = UPDATE_DAILY_ARRAY;

  constructor(public payload: string[]) {}
}

export class UpdateHourlyArray implements Action {
  readonly type = UPDATE_HOURLY_ARRAY;

  constructor(public payload: string[]) {}
}

export class UpdateAutoResults implements Action {
  readonly type = UPDATE_AUTO_RESULTS;

  constructor(public payload: string[]) {}
}

export class UpdateSunrise implements Action {
  readonly type = UPDATE_SUNRISE;

  constructor(public payload: string) {}
}

export class UpdateSunset implements Action {
  readonly type = UPDATE_SUNSET;

  constructor(public payload: string) {}
}

export class Wind implements Action {
  readonly type = WIND;

  constructor(public payload: string) {}
}

export class UpdateCountry implements Action {
  readonly type = UPDATE_COUNTRY;

  constructor(public payload: string) {}
}

export class UpdateAlerts implements Action {
  readonly type = UPDATE_ALERTS;

  constructor(public payload: string[]) {}
}


export type WeatherLocationActions =
  UpdateLocation |
  UpdateCode |
  UpdateLatitude |
  UpdateLongitude |
  UpdateDailyArray |
  UpdateHourlyArray |
  UpdateAutoResults |
  UpdateSunrise |
  UpdateSunset |
  Wind |
  UpdateCountry |
  UpdateAlerts;
