import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams) {

    console.log("Hola Mundo");
  }

  onClick() {
    this.iab.create('http://172.20.10.5:8080', '_self', { location: 'no' });
  }

}
