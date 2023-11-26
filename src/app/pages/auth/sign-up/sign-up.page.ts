import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utils/custom-validators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(4)]),
    confirmPassword: new FormControl(''),
    role: new FormControl('', [Validators.required])
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password),
    ]);

    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'Registrando...' });
      this.firebaseSvc.signUp(this.form.value as User).then(
        async (res) => {
          console.log(res);
          await this.firebaseSvc.updateUser({
            displayName: this.form.value.name,
          });

          let user: User = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            role: this.form.value.role,
          };

          this.utilsSvc.setElementLocalStorage('user', user);
          this.firebaseSvc.saveUserData(user)
          this.utilsSvc.routerLink('/tabs/home');
 
          this.utilsSvc.dismissLoading();

          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2000,
            color: 'primary',
            icon: 'person-outline'
          });

          this.form.reset()
        },
        (error) => {
          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({
            message: error,
            duration: 3000,
            color: 'warning',
            icon: 'alert-circle-outline'
          });
        }
      );
    }
  }
}
