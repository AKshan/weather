import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  title = 'London'
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {

  }

}
