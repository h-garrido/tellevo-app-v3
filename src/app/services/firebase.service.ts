import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { deleteDoc, getDoc, updateDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  getUserAuth() {
    return this.auth.currentUser;
  }
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private utilsSvc: UtilsService) {}

  /* AUTENTICACION */
  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState() {
    return this.auth.authState;
  }

  async signOut() {
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    localStorage.removeItem('user');
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  async saveUserData(user: User) {
    try {
      // Asumiendo que el UID del usuario ya está incluido en el objeto user que recibimos
      const uid = user.uid;
      // Preparar los datos del usuario para Firestore
      const userData = {
        uid: uid, // UID obtenido de Firebase Authentication
        email: user.email,
        name: user.name,
        role: user.role,
        // Agrega aquí cualquier otro dato que necesites guardar
      };

      // Guardar los datos del usuario en la colección 'users' con el UID como clave del documento
      await this.db.collection('users').doc(uid).set(userData);
      
      this.utilsSvc.presentToast({message: 'Usuario registrado con éxito', color:'success', duration:2000});
      // Puedes redirigir al usuario a otra página si es necesario
      this.utilsSvc.routerLink('/tabs/home');
      return userData;
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
      this.utilsSvc.presentToast({message: 'Error al guardar los datos del usuario: ' + error.message});
      
      throw error; // Re-lanzar el error si quieres manejarlo más arriba en la cadena de promesas
    }
  }

  async getUserData(uid: string): Promise<User | null> {
    try {
      const userDocRef = this.db.collection('users').doc(uid).ref; // Referencia al documento del usuario
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        // El documento existe, convertir a tipo User
        return docSnapshot.data() as User;
      } else {
        // El documento no existe
        this.utilsSvc.presentToast({message: 'No se encontró el usuario'});
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      this.utilsSvc.presentToast({message: 'Error al obtener los datos del usuario: ' + error.message});
      throw error; // Re-lanzar el error si quieres manejarlo más arriba
    }
  }

  async updateUserData(uid: string, userData: Partial<User>): Promise<void> {
    try {
      const userDocRef = this.db.collection('users').doc(uid).ref; 
      await updateDoc(userDocRef, userData);
      this.utilsSvc.presentToast({message: 'Datos del usuario actualizados con éxito'});
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      this.utilsSvc.presentToast({message: 'Error al actualizar los datos del usuario: ' + error.message});
      throw error; // Re-lanzar el error si quieres manejarlo más arriba
    }
  }

  async deleteUserData(uid: string): Promise<void> {
    try {
      const userDocRef = this.db.collection('users').doc(uid).ref;
      await deleteDoc(userDocRef);
      this.utilsSvc.presentToast({message: 'Usuario eliminado con éxito'});
      // Si necesitas realizar alguna acción después de eliminar el usuario, como redirigir, hazlo aquí
      this.utilsSvc.routerLink('/auth');
    } catch (error) {
      console.error('Error al eliminar los datos del usuario:', error);
      this.utilsSvc.presentToast({message: 'Error al eliminar los datos del usuario: ' + error.message});
      throw error; // Re-lanzar el error si quieres manejarlo más arriba
    }
  }

  /* VIAJES */

  async saveTravelRequest(travelRequest: any) {
    try {
      const user = await this.getUserAuth();
      const uid = user.uid;
      const travelRequestData = {
        uid: uid,
        origin: travelRequest.origin,
        destination: travelRequest.destination,
        status: 'Solicitado',
      };
      await this.db.collection('travelRequests').add(travelRequestData);
      this.utilsSvc.presentToast({message: 'Solicitud de viaje registrada con éxito'});
      this.utilsSvc.routerLink('/tabs/home');
    } catch (error) {
      console.error('Error al guardar la solicitud de viaje:', error);
      this.utilsSvc.presentToast({message: 'Error al guardar la solicitud de viaje: ' + error.message});
      throw error;
    }
  }
}
