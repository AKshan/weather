import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})

export class WeatherInfoComponent implements OnInit {
  cityForm!: FormGroup;
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
  selectCity:any;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
  }

  ngOnInit() {
    // Reactive Form
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required],
      cityControl: ['']
    });

    // Push JSON data to Array
    const arr = this.cities;
    arr.forEach((cities, index) => {
      this.weatherService.getWeatherData(cities.name)
        .subscribe(
          res => {
            if (res) {
              this.weatherData.push(this.parseData(res));
            }
          }
        )
    })
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
          this.result = false;
          this.weatherData.push(this.parseData(res));
        },
        error => {
          this.result = true;
        });
  }

  resetForm() {
    this.cityForm.reset();
  }

  weatherDetails(id:any) {
    this.selectCity = id;
  }

}
