import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
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
}
