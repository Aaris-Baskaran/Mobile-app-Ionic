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
      try{
      const user = await this.ngFBAuth.createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password);
      this.router.navigate(['/home'])
      } catch(e) {
        alert('Password must have a length of atleast 6');
      }
    } else {
      alert('Passwords do not match');
    }
  }


}
