import { Component, OnInit } from '@angular/core';
import { LocationService } from '../dashboard/common/helpers/location.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  states: Array<any> = [];
  allStates: Array<any> = [];
  citiesOfStates: Array<any> = [];
  geoLocations: Array<any> = [];
  selectedCity: any;
  selectState: string;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.initialize();
  }

  /**
   * Get all States on initial run
   */
  public initialize(): void {
    this.locationService.getLocation().subscribe((response: any) => {
      this.allStates = response;
      const states = _.uniq(response, (x) => {
        return x.State;
      });
      this.states =  _.sortBy(states, (S) => {
        return S.State;
      });
    });
  }

  /**
   * Retreiving all the cities based on seleected State
   * @param selectedState selected dropdown output
   */
  public selectedState(selectedState): void {
    this.selectState = selectedState.State;
    this.citiesOfStates = _.sortBy(this.allStates.filter(C => C.State === selectedState.State), (C) => {
      return C.City;
    });
  }

  /**
   * Emmitted output of list component
   * @param event selected city
   */
  public onselectedCity(event): void {
    this.geoLocations = [];
    this.selectedCity = event.City;
    this.getCoordinator(event.City);
  }

  /**
   * Get Geo Location by address
   * @param city selected city
   */
  public getCoordinator(city): void {
    new google.maps.Geocoder().geocode({ address: city }, (result, response) => {
      if (response === google.maps.GeocoderStatus.OK) {
        const lat = result[0].geometry.location.lat();
        const lng = result[0].geometry.location.lng();
        this.geoLocations = [...this.geoLocations, { lat, lng, city }];
      }
    });
  }
}
