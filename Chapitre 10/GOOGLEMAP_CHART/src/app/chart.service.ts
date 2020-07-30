import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {

  constructor(private http: Http) {}

  getPlaces() :Observable<any> {
     let url :string = "http://localhost:8889/places";
     let observable :Observable<any> = this.http.get(url).map((res:Response) => res.json()); 
     return observable;
  }

  getSalesDataOfaPlace(place: string) :Observable<any> {
     let url :string = "http://localhost:8889/place="+place;
     let observable :Observable<any> = this.http.get(url).map((res:Response) => res.json()); 
     return observable;
  }

  getPlaceInfos() :Observable<any> {
     let url :string = "http://localhost:8889/placeInfos";
     let observable :Observable<any> = this.http.get(url).map((res:Response) => res.json()); 
     return observable;
  }

}
