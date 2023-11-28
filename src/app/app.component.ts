import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { ThemeService } from './services/theme.service';
import { User } from './models/user.model';
import { ModalController } from '@ionic/angular';
import { TravelRequestModalComponent } from './shared/components/travel-request-modal/travel-request-modal.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;
  menuOptions: any[];

  constructor(private themeSvc: ThemeService, private firebaseSvc: FirebaseService, private modalController: ModalController, private router: Router) {
    this.themeSvc.setInitialTheme();   
  }

  ngOnInit() { 
    this.firebaseSvc.getAuthState().subscribe(authState => {
      if (authState) {
        this.firebaseSvc.getUserData(authState.uid).then(userData => {
          console.log(userData)
          this.user = userData;
          this.setupMenuOptions();
        });
      }
    });
    /* this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === 'travel-request') {
          this.presentTravelRequestModal();
        }
      }
    }); */
  }

  setupMenuOptions() {
    if (this.user?.role === 'Conductor') {
      this.menuOptions = [
        // Opciones del menú para conductores
        { title: 'Mis Viajes', url: '/mis-viajes', icon: 'list-outline' },
        { title: 'Solicitudes de Viaje', url: '/solicitudes-viaje', icon: 'alert-outline' },
        { title: 'Vehículos', url: '/vehiculos', icon: 'car-sport-outline' }       
      ];
    } else {
      this.menuOptions = [
        // Opciones del menú para pasajeros
        { title: 'Solicitar Viaje', url: '/travel-request', icon: 'location-outline' },
        { title: 'Mis Viajes', url: '/mis-viajes', icon: 'list-outline' }
      ];
    }
  }

  async presentTravelRequestModal() {
    const modal = await this.modalController.create({
      component: TravelRequestModalComponent,
     
    });
    return await modal.present();
  }
  
  
}
