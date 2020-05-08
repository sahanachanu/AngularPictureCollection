import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AngularFireStorage } from '../../../node_modules/@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  
  imgSrc:string;
  selectedImage:any;
  isSubmitted:boolean;
  showMesg:boolean = false;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private storage:AngularFireStorage, private service:ImageService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  /**uploaded file data is captured here on event "change" */ 
  uploadFileData(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=> this.imgSrc = e.target.result; 
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = ''; 
      this.selectedImage = null;
    }
  }

  /**function for form submission */
  onSubmit(formValue){
   
    this.isSubmitted = true;
    if(this.formTemplate.valid){

      //filepath to store in firebase storage
      var filePath = `images/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            if(url){
              formValue['imageUrl'] =url;

            //service is used to insert data into database
            this.service.insertImage(formValue);
            
            //form is reset after successful submisison
            this.resetForm();
            this.showMesg=true;
            }
            else{
              console.log("error adding data to database");
            }
            
          })
        })
      ).subscribe();
    }
  }

  //form validation function
  get formControls(){
    return this.formTemplate['controls'];
  }

  //form on submission will be reset to initial state
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:''

    });

    this.isSubmitted = false;
    this.selectedImage= null;
  }

}
