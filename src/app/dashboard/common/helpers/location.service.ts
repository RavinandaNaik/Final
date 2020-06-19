import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationService  {

  constructor(private http: HttpClient) {  }



  // get list of employees with emergency contact and payments
  public getLocation(): Observable<any> {
    return this.http.get(`https://indian-cities-api-nocbegfhqg.now.sh/cities`)
    .pipe(map((res: any) => res));
  }
}
