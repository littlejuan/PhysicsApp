import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { EmailUserModel } from '../../models/EmailUserModel';
import { TabsPage } from '../tabs/tabs';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus'
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('1200ms ease-in-out')
      ])
    ]),

    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('1500ms ease-in-out')
      ])
    ]),

    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('800ms 1300ms ease-in')
      ])
    ])

  ]
})
export class LoginPage {

  private rForm: FormGroup;
  private toggleType: boolean;
  private userModel: EmailUserModel;

  public passwordType: string;
  public eyeType: string;

  public forgetPage: any;
  public signupPage: any;


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    private fb: FormBuilder,
    public platform: Platform,
    public facebook: Facebook,
    public googlePlus: GooglePlus) {
    this.userModel = new EmailUserModel();
    this.toggleType = false;
    this.uiPassword();
    this.createForm();
    this.forgetPage = ForgetPasswordPage;
    this.signupPage = SignupPage;
  }


  private createForm(): void {
    this.rForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private uiPassword(): void {
    if (this.toggleType = !this.toggleType) {
      this.passwordType = 'password';
      this.eyeType = 'eye';
    } else {
      this.passwordType = 'text';
      this.eyeType = 'eye-off';
    }
  }

  signIn() {
    this.userModel = this.rForm.value;
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
      loading.dismiss();

      this.navCtrl.setRoot(TabsPage);
    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert(
        'Error', 'Por favor intente nuevamente.');
    });
  }

  public signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email']).then(result => {
        this.authService.signInWithFacebook(result.authResponse.accessToken)
          .then(result => {
            this.navCtrl.setRoot(TabsPage);
          });
      });
    } else {
      return this.authService.signInWithPopup().then(result => {
        this.navCtrl.setRoot(TabsPage);
      });
    }
  }

  public signInWithGoogle() {
    return this.googlePlus.login({
      'webClientId': '342373127778-vpmo4uad4t5mhdk37h0vs1n9ijriqhhc.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      this.authService.signInWithGoogle(res.idToken).then(result => {
        this.navCtrl.setRoot(TabsPage);
      }).catch(err => {
        this.alert(
          'Error', 'Por favor intente nuevamente.');
      });
    });
  }

  private alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public onForgetPassword(){
    this.navCtrl
  }

}
