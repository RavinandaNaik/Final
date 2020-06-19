import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() cityList: Array<any>;
  @Output() selectedCity = new EventEmitter<any>();
  selected: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emmiting selected city details to dashboard
   * @param city selected city
   */
  getGeoLocation(location) {
    this.selected = location.City;
    this.selectedCity.emit(location);
  }
}
