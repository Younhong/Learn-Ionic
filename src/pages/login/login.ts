import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private account : any = {
    email : "",
    password : ""
  }

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController, 
    private loader: LoaderProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loader.show();
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    this.loader.hide();
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  reset() {
    let alert = this.alertCtrl.create({
      title: "Reset Password",
      message: "패스워드 재설정 링크를 받을 이메일 주소를 입력해주세요",
      inputs: [
        {
          name: "email",
          placeholder: "email"
        }
      ],
      buttons: [
        {
          text: "취소",
          role: "cancel",
          handler: data => {
            console.log("Cancel Clicked");
          }
        }, 
        {
          text: "확인",
          handler: data => {     
            var auth = firebase.auth();
            var emailAddress = data.email;

            auth.sendPasswordResetEmail(emailAddress).then(()=> {
              let alert = this.alertCtrl.create({
                title: "Password Reset Email",
                subTitle: "사용자가 입력한 이메일로 패스워드 재설정 메일이 전송되었습니다",
                buttons: ["확인"]
              });
              alert.present();
            }).catch((error) => {

            });
          }
        }
      ]
    });
    alert.present();
  }
}
