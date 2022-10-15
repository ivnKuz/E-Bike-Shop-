import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupService } from './popup.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  shops: string = '/assets/data/shops.geojson';

  constructor(private http: HttpClient, private popupService: PopupService) { }
//This code handles the logic for loading and adding markers to the map.
//loop through each feature, construct a marker, and add it to the map.
  makeCapitalMarkers(map: L.Map): void { 
    this.http.get(this.shops).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        marker.addTo(map);
      }
    });
  }
}
