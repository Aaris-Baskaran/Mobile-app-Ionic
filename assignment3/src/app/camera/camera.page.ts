import { Component, OnInit } from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';

import { IonicModule } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

export class CameraPage {
  picture: string;

  constructor() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl;
  }

}
