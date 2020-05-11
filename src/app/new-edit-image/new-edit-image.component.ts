import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Circle } from '../../circles';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { EventManager} from '@angular/platform-browser';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { CircleDialogComponent } from '../circle-dialog/circle-dialog.component';

@Component({
  selector: 'app-new-edit-image',
  templateUrl: './new-edit-image.component.html',
  styleUrls: ['./new-edit-image.component.css']
})

export class NewEditImageComponent implements OnInit {

  public context: any;
  count:number = 0;
  xpos;
  ypos;
  circlesArray:any[] = [];
  circlesDivArray:any[] = [];
  onImgLoad:boolean;
 


  constructor(private route: ActivatedRoute, private routeBack : Router, private eventManager: EventManager,public dialog: MatDialog, private renderer: Renderer2) {  
    
   }

   public urlVal:any;

  //Decorators to access elements from template
  @ViewChild('xvalue', { static: false }) public x_value: ElementRef;
  @ViewChild('yvalue', { static: false }) public y_value: ElementRef;
  @ViewChild('circleDiv', { static: false }) public circleDiv: ElementRef;
  @ViewChild('newCanvasDiv', { static: false }) public newCanvas: ElementRef;
  @ViewChild('mainDiv', { static: false }) public mainDiv: ElementRef;
  @ViewChild('btn', { static: false }) public btn: ElementRef;
   

    ngAfterViewInit(){

      //Assigning the input elements to variables
   

      //Assigning instance of circle element and circles array to variables of type array
      var circlesDivArray:any[]=this.circlesDivArray;
      var circleArray:any[] = this.circlesArray;
     
      //The instance of MatDialog is assigned to a variable
      var cirDialog = this.dialog;
      var newCanvas = this.newCanvas.nativeElement;
      var x_val = this.x_value.nativeElement;
      var y_val = this.y_value.nativeElement;

      
      //Instance of the Canvas is used to obtain its 2d context
      this.context = (<HTMLCanvasElement>this.newCanvas.nativeElement).getContext('2d');
   
      
      var ctx = this.context;
      var imgPreview = new Image();
      var width = newCanvas.width;
      var height = newCanvas.height;
    

      //check if image is loaded before drawing it on canvas
      imgPreview.onload=function(){
          ctx.drawImage(imgPreview, 0,0, width,height);
      }                
    
      //Assigning the image src value to url value
      imgPreview.src =this.urlVal; 

     
      //event listener for "Draw Circle" button to enable drag movement for circles
      this.eventManager.addEventListener(this.btn.nativeElement, 'click', function($event){
        circlesDivArray.forEach(function (value) {
          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          var element = document.getElementById(value.id);
          element.onclick = showDialog;
          if (element) {
            element.onmousedown = dragMouseDown;
          }


      function showDialog(){
        //onclick circle dialog is opened
        let dialogRef = cirDialog.open(CircleDialogComponent); 
        dialogRef.afterClosed().subscribe(result =>{
          if(result){
            for (let entry of circleArray) {
              //Add the input values to corresponsing circles object only if id is matched
              if(entry.id == value.id)
                {
                    entry.firstName = result.data.firstName;
                    entry.lastName = result.data.lastName;
                    
                    //X and y values are  displayed
                    x_val.innerHTML = entry.xval;
                    y_val.innerHTML = entry.yval;

                }

              }
          }
          else{
            console.log("Dialog is closed");
          }
        });
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
      
        e = e || window.event;
        e.preventDefault();

      
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        var top = element.offsetTop - pos2;
        var left = element.offsetLeft - pos1;
        var width = newCanvas.width;
        var height = newCanvas.height;

        //Limits are applied to prevent dragging of circle outside the div
        if(top<0)
        {
          top = 0; 
          element.style.top = top + "px";
        }

        else if(top>(height-element.clientHeight)){
          top=height-element.clientHeight;
          element.style.top = top + "px";
        }
        else if(left <0)
        {
          left = 0;
          element.style.left = left + "px";
        }
        else if(left>(width-element.clientWidth))
        {
          left=width-element.clientWidth;
          element.style.left = left + "px";
        }
        else{
          element.style.top = top + "px";
          element.style.left = left + "px";
        }
        

        for (let entry of circleArray) {
          if(e.srcElement.id == entry.id){
            entry.xval = left;
            entry.yval = top;
            
            x_val.innerHTML = entry.xval;
            y_val.innerHTML = entry.yval;

          }
      }
    }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;

      }



        });
      });
   
    }

   
  ngOnInit(): void {
    //Obtaining the url information sent as routing parameter
    let url = this.route.snapshot.paramMap.get('url');
    this.urlVal = url;
    
  }

  ondrawCircle(){
    this.count = this.count+1; 
    
    
    //circle div is created dynamically
    var element: HTMLDivElement = this.renderer.createElement('div');
    element.className="circleDiv";
    element.id = "circleDiv"+this.count;
    element.style.position ="absolute";

    //Random values for x and y position is calculated
    let x_position:any = (Math.random()*this.newCanvas.nativeElement.width*0.85).toFixed(2);
    let y_position:any = (Math.random()*this.newCanvas.nativeElement.height*0.85).toFixed(2);
    
    

    element.style.left = x_position+"px";
    element.style.top = y_position+"px";
      this.renderer.appendChild(this.mainDiv.nativeElement, element)
      this.circlesDivArray.push(element);
      let circle = {
        id:"circleDiv"+this.count,
        xval:x_position,
        yval:y_position
      };

      this.xpos = x_position;
      this.ypos = y_position;
      this.circlesArray.push(circle); 
  }

  

  //home icon is directed to home page here
  goBack(){
    this.routeBack.navigate(['/home']);
  }

    
  

 

}
