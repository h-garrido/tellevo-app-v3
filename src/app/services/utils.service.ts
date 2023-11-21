import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  /* LOADING */

  loading() {
    return this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
      showBackdrop: true,
      cssClass: 'loading',
    });
  }

  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismissLoading() {
    return this.loadingController.dismiss();
  }

  /* LOCAL STORAGE */

  setElementLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  /* TOAST */

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  /* ROUTER */

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  /* ALERT */

  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }
}
