import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { EmailUserModel } from '../models/EmailUserModel';

@Injectable()
export class AuthService {
    user: firebase.User;

    constructor(public angularFireAuth: AngularFireAuth) {
        angularFireAuth.authState.subscribe((user: firebase.User) => {
            this.user = user;
        });
    }

    get authenticated(): boolean {
        return this.user != null;
    }

    signInWithEmailAndPassword(userModel: EmailUserModel): firebase.Promise<any> {
        return this.angularFireAuth.auth
            .signInWithEmailAndPassword(userModel.email, userModel.password);
    }

    signInWithFacebook(accessToken: string): firebase.Promise<any> {
        const facebookCredential =
            firebase.auth.FacebookAuthProvider.credential(accessToken);
        return this.angularFireAuth.auth.signInWithCredential(facebookCredential);
    }

    signInWithGoogle(accessToken: string): firebase.Promise<any> {
        const googleCredential =
            firebase.auth.GoogleAuthProvider.credential(accessToken);
        return this.angularFireAuth.auth.signInWithCredential(googleCredential);
    }

    signInWithPopup(): firebase.Promise<any> {
        return this.angularFireAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    createUserWithEmailAndPassword(userModel: EmailUserModel): firebase.Promise<any> {
        return this.angularFireAuth.auth
            .createUserWithEmailAndPassword(userModel.email, userModel.password);
    }

    signOut(): firebase.Promise<any> {
        return this.angularFireAuth.auth.signOut();
    }

    resetPassword(email: string): firebase.Promise<any> {
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }
}
