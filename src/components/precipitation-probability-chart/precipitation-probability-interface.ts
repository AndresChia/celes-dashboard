export interface PrecipitationProbabilityI {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  dt: number;
  main: MainClass;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: Date;
}

export interface Clouds {
  all: number;
}

export interface MainClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: Pod;
}

export enum Pod {
  D = 'd',
  N = 'n'
}

export interface Weather {
  id: number;
  main: MainEnum;
  description: Description;
  icon: Icon;
}

export enum Description {
  BrokenClouds = 'broken clouds',
  LightRain = 'light rain',
  OvercastClouds = 'overcast clouds'
}

export enum Icon {
  The04D = '04d',
  The04N = '04n',
  The10D = '10d',
  The10N = '10n'
}

export enum MainEnum {
  Clouds = 'Clouds',
  Rain = 'Rain'
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
