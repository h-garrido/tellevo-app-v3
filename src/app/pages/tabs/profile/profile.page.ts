import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User

  constructor(private auth: AngularFireAuth, private firebaseSvc: FirebaseService, private utilsSvc: UtilsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUserData();
  }

  async loadUserData() {
    this.firebaseSvc.getAuthState().subscribe((user) => {
      if (user) {
        this.firebaseSvc.getUserData(user.uid).then(userData => {
          if (userData) {
            this.user = userData;
          } else {
            this.utilsSvc.presentToast({message: 'No se pudo cargar la información del usuario'});
          }
        }).catch(error => {
          console.error('Error al cargar la información del usuario:', error);
          this.utilsSvc.presentToast({message: 'Error al cargar la información del usuario'});
        });
      } else {
        this.utilsSvc.presentToast({message: 'Ha cerrado la sesión correctamente', duration: 1000});
        // Aquí podrías redirigir al usuario a la pantalla de inicio de sesión
      }
    }, error => {
      console.error('Error al obtener el estado de autenticación:', error);
      this.utilsSvc.presentToast({message: 'Error al obtener el estado de autenticación'});
    });
  }


  signOut() {
   this.utilsSvc.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Quiéres cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Si, cerrar',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    }
  )} 

}
