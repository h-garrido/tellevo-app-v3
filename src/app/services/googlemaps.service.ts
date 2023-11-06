import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  apiKey = environment.googleMapsApiKey;
  mapsLoaded = false;

  constructor() { }

  init(renderer: any, document: any): Promise<any> {
    return new Promise((resolve) => {
      if (this.mapsLoaded) {
        console.log('Google Maps preview loaded')
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['mapsInit'] = () => {
        this.mapsLoaded = true;
        if (google) {
          console.log('Google Maps loaded')
        } else {
          console.log('Google Maps not loaded')
        }
        resolve(true);
        return;
      }

      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapsInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapsInit';
      }

      renderer.appendChild(document.body, script);
    })
  }
}
