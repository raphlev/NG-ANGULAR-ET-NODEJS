import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public overlays: any[];
  public options: any;
  
  constructor(private dataService: DataService) {}

  ngOnInit() {

     this.dataService.getPlaceInfos()
         .subscribe(res => {
	         let latLng = new google.maps.LatLng(res[0][1], res[0][2]);
	         this.options = { center: latLng, zoom: 10 };
                 this.overlays = [];
                 for (let infos of res) {
		      let latLng = new google.maps.LatLng(infos[1], infos[2]);
                      this.overlays.push(new google.maps.Marker({title: infos[0], position: latLng}));
		      this.overlays.push(new google.maps.Circle({name: infos[0], center: latLng,
			                                         fillColor:'#1976D2',fillOpacity: 0.35,
								 radius: infos[3]*10}));
                 }
              },
              err => console.error(err),
              () => console.log('getPlaceInfos() done'));
  }

  handleMapClick(event) {}

  handleOverlayClick(event) {
     console.log("Clic sur "+event.overlay.name);
  }
}
