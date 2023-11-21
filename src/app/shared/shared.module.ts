import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';


@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, GooglemapsComponent ],
  exports: [HeaderComponent, CustomInputComponent, LogoComponent, GooglemapsComponent, ReactiveFormsModule],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
