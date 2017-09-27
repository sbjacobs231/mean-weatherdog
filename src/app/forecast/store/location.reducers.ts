import * as WeatherLocationActions from './location.actions'

export interface AppState {
  weatherLocation: State;
}

export interface State {
  wLocation: string;
  cityCode: string;
  latitude: string;
  longitude: string;
  dailyArray: string[];
  hourlyArray: string[];
  autoResults: string[];
  sunrise: string;
  sunset: string;
  wind: string;
  country: string;
  alerts: string[];
}

const initialState: State = {
  wLocation: 'San Francisco, CA',
  cityCode: '/q/zmw:94102.1.99999',
  latitude: '37.779999',
  longitude: '-122.419998',
  dailyArray: [],
  hourlyArray: [],
  autoResults: [],
  sunrise: '',
  sunset: '',
  wind: '',
  country: 'US',
  alerts: []
}

export function weatherLocationReducer(state = initialState, action: WeatherLocationActions.WeatherLocationActions) {
  switch(action.type) {
    case WeatherLocationActions.UPDATE_LOCATION:
      return {
        ...state,
        wLocation: action.payload
      };
    case WeatherLocationActions.UPDATE_CODE:
      return {
        ...state,
        cityCode: action.payload
      }
    case WeatherLocationActions.UPDATE_LATITUDE:
      return {
        ...state,
        latitude: action.payload
      }
    case WeatherLocationActions.UPDATE_LONGITUDE:
      return {
        ...state,
        longitude: action.payload
      }
    case WeatherLocationActions.UPDATE_DAILY_ARRAY:
      return {
        ...state,
        dailyArray: action.payload
      }
    case WeatherLocationActions.UPDATE_HOURLY_ARRAY:
      return {
        ...state,
        hourlyArray: action.payload
      }
    case WeatherLocationActions.UPDATE_AUTO_RESULTS:
      return {
        ...state,
        autoResults: action.payload
      }
    case WeatherLocationActions.UPDATE_SUNRISE:
      return {
        ...state,
        sunrise: action.payload
      }
    case WeatherLocationActions.UPDATE_SUNSET:
      return {
        ...state,
        sunset: action.payload
      }
      case WeatherLocationActions.WIND:
        return {
          ...state,
          wind: action.payload
        }
    case WeatherLocationActions.UPDATE_COUNTRY:
      return {
        ...state,
        country: action.payload
      }
      case WeatherLocationActions.UPDATE_ALERTS:
        return {
          ...state,
          alerts: action.payload
        }
    default:
      return state;
  }
}
