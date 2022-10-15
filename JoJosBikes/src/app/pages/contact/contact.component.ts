import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MarkerService } from '../../marker.service';
import * as L from 'leaflet';
import { NgForm } from '@angular/forms';
//defining the icon
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit  {
  //getting the element with local reference "f"(contact us form)
  @ViewChild('f') contactUsForm: NgForm;
  private map:any;

//using leaflet map API
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 41.316474976300725, -103.90792900924762 ],
      zoom: 4
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
   }
   //submiting form, getting input values and checking if its valid or not
   onSubmit(){
    this.contactUsForm.form.valid ? console.log('valid') : console.log('invalid');
    console.log(this.contactUsForm.form.value);
   }

}
