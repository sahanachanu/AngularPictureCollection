import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {
 
 



  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {  
            
   }
    
  ngOnInit(): void {
  }

}
