import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.firebaseSvc.getAuthState().pipe(map(auth => {

      /* Si existe usuario autenticado */
      if (auth) {
        return true;
      /* No existe usuario autenticado */
      } else {
        this.utilsSvc.presentToast({message: 'No tienes permiso para acceder a esta página', duration: 2000});
        this.utilsSvc.routerLink('/auth');
        return false;
      }
    }))

    
  
  }
  
}
