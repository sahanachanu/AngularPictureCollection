import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '../../../node_modules/@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList:AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) { }

  //function to get data from database
  getImageDetailList(){
    this.imageDetailList = this.firebase.list("imageDetails");
  }

  //function to insert image data into database
  insertImage(imageDetails){
    this.imageDetailList.push(imageDetails);
  }
}
