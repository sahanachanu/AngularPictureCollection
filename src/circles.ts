
//this class was created to draw multiple circles on canvas
export class Circle {
    xval;
    yval;
    radius;
    id;

    constructor(xval, yval, radius, id){
        this.xval = xval;
        this.yval= yval;
        this.radius = radius;
        this.id = id;

    }
    draw(context){
        context.beginPath();
        context.arc(this.xval, this.yval, this.radius, 0 , Math.PI * 2, false);
        context.fillStyle = "red";
        context.fill();
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
    }

    

}