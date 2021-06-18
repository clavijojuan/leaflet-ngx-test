import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from "leaflet";
import { ModalpruebaComponent } from '../modalprueba/modalprueba.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public map: any;
  public display = false;
  public coords = {lat: '', lng:''};
  public markers = [];
  public pointData: any;
  
  constructor() { 
    /*
    this.layers = [
      L.circle([ 4.642829, -74.214555 ], { radius: 5000 }),
      L.polygon([[ 4.742809, -74.114685 ], [ 4.642869, -74.514555 ], [ 4.642849, -74.414555 ]]),
      L.marker([ 4.642809, -74.114685])
    ];
    */
  }
  
  ngOnInit(): void {
      this.map = L.map("map", {
      zoomControl: false,
      center: L.latLng(4.642809, -74.114685),
      zoom: 6,
      minZoom: 4,
      maxZoom: 19,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
    });

    L.control.zoom({ position: "topleft" }).addTo(this.map);
    // L.control.layers('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.control.scale().addTo(this.map);
  }
  
  ngAfterViewInit(): void{
    this.map.on("click", this.addMarker.bind(this))
  }
  

  addMarker(e: L.LeafletMouseEvent) {
    const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
    const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;

    const marker = L.marker(e.latlng, {
      draggable: true,
    }).addTo(this.map)
    this.coords.lat = String(shortLat);
    this.coords.lng = String(shortLng);
    this.display=true;

    this.markers.push({'lat': this.coords.lat, 'lng': this.coords.lng, 'test':''})


    marker.on("click", (_e) => {
      //marker.remove()
      const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
      const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;
      
      this.coords.lat = String(shortLat);
      this.coords.lng = String(shortLng);
      let point = this.markers.filter(item => 
        this.coords.lat === item.lat && this.coords.lng === item.lng
      )
      this.pointData = point;
      this.display=true;
    }); 
  }

  onCloseModal(){
    this.display=false;
  }

  saveData(input: any){
    let point = this.markers.filter(item => 
      input.coords.lat === item.lat && input.coords.lng === item.lng
    )
    point[0].test = input.test
  }
  
}
