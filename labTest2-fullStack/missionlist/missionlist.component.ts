import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {Mission} from '../models/mission';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  @Input() missions: Mission[];
  selectedMission?: Mission;
  base64Image: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getMission();
    //let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png';
    //this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {    
      //console.log(base64data);
      // this is the image as dataUrl
      //this.base64Image = 'data:image/jpg;base64,' + base64data;
    //});
  }

  onSelect(mission: Mission): void {
    this.selectedMission = mission;
  }

  getMission(){
    this.httpClient.get<any>('https://api.spacexdata.com/v3/launches').subscribe(
      response => {
        console.log(response);
        this.missions = response;
      }
    );
  }
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
           observer.error(err);
        };
      } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
      }
    });
 }
 getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  // This will draw image    
  ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  var dataURL = canvas.toDataURL("image/png");
return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
 

}
