import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Location {
  suggestions: Object;
}
interface CurrentLocation{
  city: string;
  region_code: string;
  country_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
   }
   getLocation(city_location:any): Observable<any>{
     //getting location for autocomplete
     let query_param = new HttpParams().set('query',city_location);
    return this.http.get('http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=csJYl5CwSFm7CaS7NAlx&app_code=wYuUAxOjjgBr_146wNuW7g&',{params:query_param})
  }
  getCurrentLocation(){
    //getting current location
    return this.http.get<CurrentLocation>('https://ipapi.co/json/')
  }
}
