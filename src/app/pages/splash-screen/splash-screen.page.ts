import { Component, inject} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage {

  navCtrl = inject(NavController);

  ionViewDidEnter() {
    // Espera 4 segundos (tiempo total del splash screen) y luego muestra el spinner
    setTimeout(() => {
      const splashScreen = document.getElementById('splashScreen');
      const spinner = document.getElementById('spinner');

      if (splashScreen) {
        splashScreen.style.display = 'none';
      }
      if (spinner) {
        spinner.style.display = 'flex';
      }

      // Oculta el spinner después de 2 segundos
      setTimeout(() => {
        if (spinner) {
          spinner.style.display = 'none';
        }
        this.navCtrl.navigateForward('/auth');

      }, 2000);

    }, 4000);
  }
}
