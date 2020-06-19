import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() city: any;
  @Input() geoLocations: Array<any>;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  lat: number;
  lng: number;
  mapWidth = '100%';
  mapHeight = '100%';

  constructor() { }

  ngOnInit() {
    this.getCoordinator('Bangalore');
  }

  ngOnChanges() {
    if (this.city) {
      this.getCoordinator(this.city);
    }
    if (this.geoLocations) {
      this.initMap();
      this.setLocation(this.map);
    }
  }

  /**
   * Initialize the map based on latitude and longitude
   */
  public initMap(): void {
    const mapProp = {
      zoom: 4,
      center: new google.maps.LatLng(this.lat, this.lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if (this.geoLocations) {
      this.setLocation(this.map);
    }
  }

  /**
   * Get Geo Location by address
   * @param city selected city
   */
  public getCoordinator(city): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: city }, (result, response) => {
      if (response === google.maps.GeocoderStatus.OK) {
        this.lat = result[0].geometry.location.lat();
        this.lng = result[0].geometry.location.lng();
        if (this.lat && this.lng) {
          this.initMap();
        }
      }
    });
  }

  /**
   * Drop a pin on selected city
   * @param map google.maps.Map
   */
  public setLocation(map): void {
    this.geoLocations.forEach(M => {
      this.marker = new google.maps.Marker({
        position: { lat: M.lat, lng: M.lng },
        map,
        title: M.city,
        draggable: true,
        animation: google.maps.Animation.DROP,
      });
    });
  }
}
