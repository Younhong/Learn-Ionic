import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';

var firebaseConfig = {
  apiKey: "AIzaSyCCB1-ZtJ7ZycSwqbJ02CI3tu4wR9sv0Ts",
  authDomain: "simplelogin-8a050.firebaseapp.com",
  databaseURL: "https://simplelogin-8a050.firebaseio.com",
  projectId: "simplelogin-8a050",
  storageBucket: "simplelogin-8a050.appspot.com",
  messagingSenderId: "613139173679",
  appId: "1:613139173679:web:b24fd111e19051537091da",
  measurementId: "G-ZJRHLQWSWH"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) =>  {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}

