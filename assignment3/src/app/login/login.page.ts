import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userDetails = {
    email: '',
    password: ''
  }

  constructor(private router: Router,
                public ngFBAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async loginUser(){
    const user = await this.ngFBAuth.signInWithEmailAndPassword(this.userDetails.email, this.userDetails.password);

    if(user.user.email){
      this.router.navigate(['/home/']);
    } else {
      alert('Please enter correct username and password');
    }
  }
  goToSignup(){
    this.router.navigate(['/sign-up']);
  }

}
