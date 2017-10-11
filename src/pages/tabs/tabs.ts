import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LessonsPage } from '../lessons/lessons';
import { FriendsPage } from '../friends/friends';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = LessonsPage;
  tab3Root = FriendsPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
