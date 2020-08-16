import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    private alertCtrl: AlertController) {

  }

  logout() {

    let confirm = this.alertCtrl.create({
      title: "Logout",
      message: "Log out 하시겠습니까?",
      buttons: [
        {
          text: '아니오',
          handler: () => {
            console.log("Disagree clicked");
          }
        }, 
        {
          text: '예',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log("Log out");
            }).catch((error) => {
              console.log("Log out error");
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
