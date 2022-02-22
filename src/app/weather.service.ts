import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  appId: string = '1492887c6bd8ace21019256eb7dcc5ae'

  constructor(private http: HttpClient) {
  }

  getWeatherData(cityName: any): Observable<any> {
    let params = new HttpParams().set('q', cityName);
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${this.appId}`,
      {params: params}).pipe(
        map(res => res),
      catchError((err) => {
          console.log('error caught in service - City parameter is not found in the URL')
          console.error(err);
          return throwError(err);
        }
      ));
  }

}
