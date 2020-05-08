import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-circle-dialog',
  templateUrl: './circle-dialog.component.html',
  styleUrls: ['./circle-dialog.component.css']
})
export class CircleDialogComponent implements OnInit {

  firstName:string;
  lastName:string;
  setFname:boolean=false;
  setLname:boolean=false;


  constructor(
    public dialogRef: MatDialogRef<CircleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }
 

  ngOnInit(): void {
  }

  //dialog on save and close sends data back to edit-image module for display
  sendData(){ 

    //Error handling: check if valid input data was sent
    if((this.firstName == "" || this.firstName == undefined)&&(this.lastName == "" || this.lastName == undefined))
    {
      this.setFname = true;
      this.setLname = true;
    }
    else if(this.firstName == "" || this.firstName == undefined)
    {
      this.setFname = true;
    } 
    else if(this.lastName == "" || this.lastName == undefined)
      {
        this.setLname = true;
      }
    else
      {
        this.dialogRef.close({event:'close',data:{firstName:this.firstName, lastName:this.lastName}});
      }
    }

    //close the dialog if nothing was entered in input field
    close(){
      this.dialogRef.close();
    }
    
     
  }



