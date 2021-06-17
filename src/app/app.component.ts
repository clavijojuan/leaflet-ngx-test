import { Component } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
declare let L:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-leaflet';
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(4.505,-75.09)
  };
  layerGroup = L.layerGroup();
  layers = [this.layerGroup];


  

  onMapClick(event:any):void{
    let point = marker([event.latlng.lat,event.latlng.lng], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    })
    this.layerGroup.addLayer(point)
  }


}
