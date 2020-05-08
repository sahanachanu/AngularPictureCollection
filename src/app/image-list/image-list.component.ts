import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../services/image.service';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { ImagesComponent } from '../images/images.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList:any [];
  indexList :any[];
  urlVal : string;
  goToEdit:boolean;

  constructor( private service:ImageService, public dialog: MatDialog, private router:Router) { }
  /*Decorators to access components from template */
  @ViewChild('GridViewDiv', { static: false }) public gridView: ElementRef;
  @ViewChild('ListViewDiv', { static: false }) public listView: ElementRef;


  ngOnInit(): void {
    //Obtaining the image data from database
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        //returns a json object containing image properties (url and caption)
        this.imageList = list.map(item => {return item.payload.val();});
        //getting the index values of imageList
        this.indexList = Array.from(Array(this.imageList.length).keys());
      }
    );
  }

  /*The two views (list/grid) of list is controlled here */
  openListView(){
    if(this.gridView.nativeElement.style.display == "")
    {
      this.gridView.nativeElement.style.display = "none";
      this.listView.nativeElement.style.display = "";
    }
  }

  openGridView(){
    if(this.listView.nativeElement.style.display == "")
    {
      this.listView.nativeElement.style.display = "none";
      this.gridView.nativeElement.style.display = "";
    }
  }

  /**Function to open the "upload images" dialog */
  openDialog(){
    this.dialog.open(ImagesComponent);
  }

  /**Function to display image in dialog  */
  showImage(val){
   this.urlVal = val;
   
   /**Sending data(url) to the image display dialog */
   let dialogRef =  this.dialog.open(ImageDisplayComponent,{data:{url: this.urlVal}});

   /**Subscribing to the result from image display dialog */
    dialogRef.afterClosed().subscribe(result =>{
      if(result == "true"){
        this.router.navigate(['/edit', val]);
      }
      else{
        this.goToEdit = false;
      }
    });

  }
}
