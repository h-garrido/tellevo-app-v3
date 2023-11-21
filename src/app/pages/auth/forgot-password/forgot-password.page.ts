import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private firebaseSvc: FirebaseService, private utilsSvc: UtilsService) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {

        this.utilsSvc.presentToast({
          message: 'Se ha enviado un correo para restablecer tu contraseña',
          duration: 3000,
          color: 'success',
          position: 'middle',
          icon: 'mail-outline',
          mode: 'ios'
        })

        this.utilsSvc.routerLink('/auth');
        this.form.reset();

      }).catch(err => {
        console.log(err);

        this.utilsSvc.presentToast({
          message: 'Ha ocurrido un error, intentalo nuevamente',
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
          mode: 'ios'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

}
