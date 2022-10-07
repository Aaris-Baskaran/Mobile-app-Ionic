import { Component, OnInit } from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

export class CameraPage {
  picture: any;

  constructor() {
    this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl;

    const srcImg = new Image();
    srcImg.src = this.picture;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    //var avgLuminance = 0;
    srcImg.onload = () => {
      canvas.width = srcImg.width;
      canvas.height = srcImg.height;  

      ctx.drawImage(srcImg, 0, 0, canvas.width, canvas.height);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var numPixels = data.length / 4;
      var totalLuminance = 0;
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        totalLuminance += avg;
      }
      
      
      this.checkLuminance(totalLuminance / numPixels);
    }
    
    console.log(this.picture);
  }

  checkLuminance(avgLuminance) {
    //check if avgLuminance is less than 128
    if (avgLuminance < 128) {
      var userPreference;

      if (confirm("The average luminance is less than 128 do you want to save photo?") == true) {
        userPreference = "Data saved successfully!";
      } else {
        userPreference = "Save Cancelled!";
}
      //tell the user the average luminance is less than 128
      //alert("The average luminance is less than 128");
    } else if (avgLuminance > 200) {
      //tell the user the average luminance is greater than 228
      alert("The average luminance is greater than 228");
    } else {
      //save the image
      
    }
    console.log(avgLuminance);
  }

}
