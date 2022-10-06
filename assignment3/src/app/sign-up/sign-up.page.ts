import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userDetails = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private router: Router,
    public ngFBAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  async registerUser(){
    if(this.userDetails.password == this.userDetails.confirmPassword){
      const user = await this.ngFBAuth.createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password);
      this.router.navigate(['/home'])
    } else {
      alert('Passwords do not match');
    }
  }


}
