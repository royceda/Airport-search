import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WorldService {

  url: string = 'assets/airports.json';

  constructor(private _http: HttpClient) { }

  getAirports(){
    return this._http.get(this.url)
  }

}
