import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})

export class WeatherInfoComponent implements OnInit {
  locNameForm!: FormGroup;
  weatherData: any = [];
  result = false;
  errorMessage = 'Please enter city name correctly';
  cities = [
    {'name': 'London'},
    {'name': 'Paris'},
    {'name': 'New York'},
    {'name': 'Los Angeles'},
    {'name': 'Tokyo'}
  ]
  selectCity: any = []

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
  }

  ngOnInit() {
    // Reactive Form
    this.locNameForm = this.fb.group({
      cityName: ['', Validators.required],
      cityControl: ['']
    });

    // Push JSON data to Array
    for (let i = 0; i < this.cities.length; i++) {
      this.weatherService.getWeatherData(this.cities[i].name)
        .subscribe(
          res => {
            if (res) {
              this.weatherData.push(this.parseData(res));
            }
            // console.log(this.weatherData);
          }
        )
    }
  }

  // Filter Data
  parseData(data: any) {
    return {
      main: data.main,
      weather: data.weather[0],
      name: data.name
    }
  }


  // Add Cities for dummy purpose only
  addData(cityName: any) {
    this.weatherService.getWeatherData(cityName)
      .subscribe(
        res => {

          //console.log('response received')
          this.result = false;
          this.weatherData.push(this.parseData(res));
        },
        error => {
          console.error(this.errorMessage);
          this.result = true;
        });
  }


}
