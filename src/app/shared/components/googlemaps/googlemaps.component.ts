import {
  Component,
  Input,
  OnInit,
  Inject,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GooglemapsService } from 'src/app/services/googlemaps.service';
import { DOCUMENT } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {
  @Input() position = {
    lat: -41.4657400,
    lng: -72.9428900,
  };

  label = {
    title: 'Ubicación',
  };

  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsSvc: GooglemapsService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.googlemapsSvc.init(this.renderer, this.document).then(() => {
      this.initMap();
    }).catch((error) => {
      console.log(error);
    });    
  }

  initMap(){
    const position = this.position;
    let latlng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center: latlng,
      zoom: 15,
      disableDefaultUI: false,
      clickeableIcons: false,
      scrollwheel: false,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    this.clickHandleEvent();
    this.infoWindow = new google.maps.infoWindow();
    if (this.label.title.length) {
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.title);
    }
  }

  clickHandleEvent() {

    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);
    })
  }

  addMarker(position: any) {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, title: string) {

    const contentString = '<div id="contentInsideMap">' +
      '<div>' +
      '</div>' +
      '<p style="font-weight: bold; margin-bottom: 5px;"></p>' +
      '<div id="bodyContent">' + 
      '</div>' +
      '</div>';
    this.infoWindow.setContent(contentString);
    this.infoWindow.open(this.map, marker);

  }

  async mylocation() {
    console.log('mylocation() click')

    Geolocation.getCurrentPosition().then ((res) => {
      console.log('mylocation() -> get')

      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
      this.addMarker(position);
    })
  }

}
