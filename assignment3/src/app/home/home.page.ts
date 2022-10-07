import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,
    public ngFBAuth: AngularFireAuth) { }

ngOnInit() {    //functions for buttons to navigate to the different pages
}
  goToCamera(){
    this.router.navigate(['/camera']);
  }

  goToImages(){
    this.router.navigate(['/images']);
  }

  goToAbout(){
    this.router.navigate(['/about']);
  }

}
