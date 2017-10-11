import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from '../providers/auth-service';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { LessonsPage } from '../pages/lessons/lessons';
import { FriendsPage } from '../pages/friends/friends';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ExperienceBarComponent } from '../components/experience-bar/experience-bar'
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { SignupPage } from '../pages/signup/signup';

const firebaseConfig = {
  apiKey: "AIzaSyCg4pKACvI7WRIFQrK_8y4mawye63r5jzI",
  authDomain: "physics-app-1b50e.firebaseapp.com",
  databaseURL: "https://physics-app-1b50e.firebaseio.com",
  projectId: "physics-app-1b50e",
  storageBucket: "physics-app-1b50e.appspot.com",
  messagingSenderId: "342373127778"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    LessonsPage,
    FriendsPage,
    ForgetPasswordPage,
    ExperienceBarComponent,
    SignupPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    SuperTabsModule.forRoot(),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    LessonsPage,
    SignupPage,
    ForgetPasswordPage,
    FriendsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Facebook,
    GooglePlus,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
