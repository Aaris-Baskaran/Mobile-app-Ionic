import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Camera, CameraResultType } from '@capacitor/camera';

import { IonicModule } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

export class CameraPage {
  picture: any;
  //private sanitizer: DomSanitizer;

  constructor() {
    this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.picture = image.dataUrl;//sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    
    //create canvas from this.picture
    // var canvas = document.createElement('canvas');
    // var ctx = canvas.getContext('2d');
    // ctx.drawImage(this.picture, 0, 0);
    // var dataURL = canvas.toDataURL('image/png');
    // //this.picture = dataURL;


    // console.log(this.picture);
    // console.log(dataURL); 
  }

}
