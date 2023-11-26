import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }
}
