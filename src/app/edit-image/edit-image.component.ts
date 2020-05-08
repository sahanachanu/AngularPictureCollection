import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Circle } from '../../circles';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { EventManager} from '@angular/platform-browser';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { CircleDialogComponent } from '../circle-dialog/circle-dialog.component';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})


export class EditImageComponent implements OnInit {

  public context: any;
  radius:number = 20;
  imageName:any;
  count:number = 0;
  xpos:number;
  ypos:number;
  circlesArray:any[] = [];
  onImgLoad:boolean;
  calcValResult:number;
  firstName:string;
  lastName:string;
 


  constructor(private route: ActivatedRoute, private routeBack : Router, private eventManager: EventManager,public dialog: MatDialog) {  
    
   }

   public urlVal:any;

  //Decorators to access elements from template
  @ViewChild('myCanvas', { static: false }) public mydiv: ElementRef;

  //firstName, lastName, x and y input elements 
  @ViewChild('fnameVal', { static: false }) public fnameVal: ElementRef;
  @ViewChild('lnameVal', { static: false }) public lnameVal: ElementRef;
  @ViewChild('xvalue', { static: false }) public x_value: ElementRef;
  @ViewChild('yvalue', { static: false }) public y_value: ElementRef;
   

    ngAfterViewInit(){

      //Assigning the input elements to variables
      var fname = this.fnameVal.nativeElement;
      var lname = this.lnameVal.nativeElement;
      var x_val = this.x_value.nativeElement;
      var y_val = this.y_value.nativeElement;

      //Assigning instance of circle array to variable of type array
      var circleListArray :any[]= this.circlesArray;
     
      //The instance of MatDialog is assigned to a variable
      var cirDialog = this.dialog;

      //Event manager plugin is used to capture the mouse events on canvas
      this.eventManager.addEventListener(this.mydiv.nativeElement, 'click', function($event){

           //Iterating through circles array
            circleListArray.forEach(function (value) {
              //calculations to obtain the information of circle clicked
              var xDiff=Math.abs(value.xval-$event.offsetX);
              var yDiff=Math.abs(value.yval-$event.offsetY);
              var calValue=Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2)); 

              if(calValue<=value.radius){
                  var response = value.id;

                  //open the dialog window 
                  let dialogRef = cirDialog.open(CircleDialogComponent);  
                  dialogRef.afterClosed().subscribe(result =>{
                        if(result){
                          for (let entry of circleListArray) {

                            //Add the input values to corresponsing circles object only if id is matched
                            if(entry.id==response)
                              {
                                  entry.firstName = result.data.firstName;
                                  entry.lastName = result.data.lastName;

                                  //Displaying values of the circle clicked/selected
                                  fname.innerHTML = entry.firstName;
                                  lname.innerHTML = entry.lastName ;
                                  
                                  //X and y values are rounded to keep it to 2 decimal values for display
                                  x_val.innerHTML = entry.xval.toFixed(2);
                                  y_val.innerHTML = entry.yval.toFixed(2);

                                  //check to see if input values are pushed to right object
                                  console.log(entry);
                              }
                
                            }
                        }
                        else{
                          console.log("Dialog is closed");
                        }
                    });
                  }
              });
        
      }); //eventmanager function ends here
      
      //Instance of the Canvas is used to obtain its 2d context
      this.context = (<HTMLCanvasElement>this.mydiv.nativeElement).getContext('2d');
   
      
      var ctx = this.context;
      var imgPreview = new Image();
      var width = this.mydiv.nativeElement.width;
      var height = this.mydiv.nativeElement.height;

      //check if image is loaded before drawing it on canvas
      imgPreview.onload=function(){
          ctx.drawImage(imgPreview, 0,0, width,height);
      }                
    
      //Assigning the image src value to url value
      imgPreview.src =this.urlVal; 

 
   
    }

   
  ngOnInit(): void {
    //Obtaining the url information sent as routing parameter
    let url = this.route.snapshot.paramMap.get('url');
    this.urlVal = url;
    
  }

  //function to draw circle on image
  ondrawCircle(){
    //everytime the function is entered count value is registered
    this.count = this.count + 1;

    //Random numbers generated for x and y values
    let random_x = Math.random()*this.mydiv.nativeElement.width;
    let random_y = Math.random()*this.mydiv.nativeElement.height;
      let circle = new Circle(random_x, random_y, this.radius, this.count);

      //Each circle drawn is added to circles array
      this.circlesArray.push(circle);
      circle.draw(this.context);

      //X and y values are rounded to keep it to 2 decimal values for display
      this.xpos = this.circlesArray[this.count-1].xval.toFixed(2) ;
      this.ypos = this.circlesArray[this.count-1].yval.toFixed(2);
  }

  //home icon is directed to home page here
  goBack(){
    this.routeBack.navigate(['/home']);
  }

    
  

 

}
