import { Component, OnInit } from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

// The camera page is a component that allows the user to take a picture and store it in the database.
export class CameraPage {
  
  picture: any;     // The picture variable is a string that stores the image data.
  insights: string; // The feedback for the user


  //initialise database and start the camera
  constructor(
    private db : AngularFireDatabase
  ) {
    this.takePicture();
  }

  //takes a picture, and checks the luminance of the picture
  async takePicture() {

    //open the camera and take the picture
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl; //store the image data in the picture variable

    //Getting the luminance of the image
    const srcImg = new Image();
    srcImg.src = this.picture;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    srcImg.onload = () => {
      canvas.width = srcImg.width;
      canvas.height = srcImg.height;  

      ctx.drawImage(srcImg, 0, 0, canvas.width, canvas.height);

      //maths to get the average luminance
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var numPixels = data.length / 4;
      var totalLuminance = 0;
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        totalLuminance += avg;
      }
      
      //call the checkLuminance function
      this.checkLuminance(totalLuminance / numPixels);
    }
    
  }

  //checks the luminance of the picture and gives feedback to the user
  checkLuminance(avgLuminance) {
    //check if avgLuminance is less than 128
    if (avgLuminance < 128) {

      if (confirm("The average luminance is less than 128 do you want to save photo?") == true) {
        this.db.object('photo/' + new Date()).set({image : this.picture});
        }
      //update insights
      this.insights = "The ambient lighting in your room is too low!\n\n\n"+
                      "Increase the brightness of the lights in your room!\n\n"+
                      "This level of brightness can cause eye strain and headaches!";
    } else if (avgLuminance > 200) {
      //tell the user the average luminance is greater than 228
      if (confirm("The average luminance is greater than 200 do you want to save photo?") == true) {
        this.db.object('photo/' + new Date()).set({image : this.picture});
        }
      //update insights
      this.insights = "The ambient lighting in your room is too high!\n\n\n"+
                      "Reduce the brightness of the lights in your room!\n\n"+
                      "This level of brightness can cause eye strain and headaches!";
    } else {
      //save the image
      this.db.object('photo/' + new Date()).set({image : this.picture});
      //update insights
      this.insights = "The ambient lighting in your room is at a good level!\n\n\n"+
                      "Keep your lights at the same level of brightness!\n\n"+
                      "This level of brightness is good for your eyes and your productivity!";
    }
    console.log(avgLuminance);
  }

}
