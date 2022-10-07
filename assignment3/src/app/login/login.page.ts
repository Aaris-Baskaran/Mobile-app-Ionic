import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

// The login page is a component that allows the user to login to the app.
export class LoginPage implements OnInit {

  userDetails = {
    email: '',
    password: ''
  }

  //initialise database and start the camera
  constructor(private router: Router,
                public ngFBAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  // checks if users email and password are correct, otherwise displays an error message
  async loginUser(){
    try{
    const user = await this.ngFBAuth.signInWithEmailAndPassword(this.userDetails.email, this.userDetails.password);

      if(user.user.email){
        this.router.navigate(['/home']);
      } 
    }catch(e){alert('Please enter correct username and password');}
  }

  // navigates to the sign-up page
  goToSignup(){
    this.router.navigate(['/sign-up']);
  }

}
