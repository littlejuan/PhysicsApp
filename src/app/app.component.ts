import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authService: AuthService) {

    /*  (authService.authenticated) ?
        this.rootPage = TabsPage : this.rootPage = LoginPage; */
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    //  this.rootPage = TabsPage;
      (authService.authenticated) ?
        this.rootPage = TabsPage : this.rootPage = LoginPage;
    });
  }
}