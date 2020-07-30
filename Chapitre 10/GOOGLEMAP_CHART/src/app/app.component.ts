import { Component } from '@angular/core';

import { ChartService } from './chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public overlays: any[];
  public options: any;
  public place: string;
  
  constructor(private chartService: ChartService) {}

  ngOnInit() {
/*  
     let latLng = new google.maps.LatLng(43.6111, 3.87667);
     this.options = { center: latLng, zoom: 10 };
     this.overlays = [
       new google.maps.Marker({title: 'MTP', position: latLng}),
       new google.maps.Circle({name: 'MTP', center: latLng,
			      fillColor:'#1976D2',fillOpacity: 0.35,
			      radius: 300});
     ];
*/

     this.chartService.getPlaceInfos()
         .subscribe(res => {
	         console.log("Dans le callback !");
	         let latLng = new google.maps.LatLng(res[0][1], res[0][2]);
	         this.options = { center: latLng, zoom: 10 };
                 this.overlays = [];
                 for (let infos of res) {
                      console.log(infos[0]+" "+infos[1]+" "+infos[2]+" "+infos[3]);
		      let latLng = new google.maps.LatLng(infos[1], infos[2]);
                      this.overlays.push(new google.maps.Marker({title: infos[0], position: latLng}));
		      this.overlays.push(new google.maps.Circle({name: infos[0], center: latLng,
			                                         fillColor:'#1976D2',fillOpacity: 0.35,
								 radius: infos[3]*10}));
                 }
              },
              err => console.error(err),
              () => console.log('getPlaceInfos() done'));
	      
     console.log("ngOnInit passé !");
  }


  handleMapClick(event) {}

  handleOverlayClick(event) {
     console.log("Clic sur "+event.overlay.name);
     this.place = event.overlay.name;
  }
}
