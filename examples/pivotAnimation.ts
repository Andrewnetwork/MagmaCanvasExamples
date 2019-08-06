import { MagmaCanvas, Grid, Line, Circle, Point } from "magma-canvas";

function circle_point(center:Point,t:number):Point{
    return {x:center.x+Math.cos(t*(Math.PI / 180)),y:center.y+Math.sin(t*(Math.PI / 180))};
}

function PE(p1:Point,p2:Point){
    return p1.x == p2.x && p1.y == p2.y; 
}

class PivotingWindmill{
    animation_handler:number;
    circ_points: Point[];
    line:Line;
    green_circles:number[];
    line_handler:number;
    penultimate_pivot:Point;

    constructor(private center:Point, private mCanvas:MagmaCanvas, private points:Point[], 
        private rotation_counter : number = 0, private rotationSpeed:number = 10){
            this.animation_handler = null;
            this.line = new Line(center,center,5, true, "green");
            this.line_handler = mCanvas.add(this.line);
            this.green_circles = [];
            this.new_pivot(center);
    }
    rotate(){
        this.line.end = this.circ_points[this.rotation_counter%this.circ_points.length];
        // Find a point which lines on the windmill line and make 
        // that point the new pivot point. 
        for(let i = 0; i < this.points.length; i++){
            if(!PE(this.points[i], this.center) && !PE(this.points[i], this.penultimate_pivot)){
                if(this.line.contains(this.points[i])){
                    this.new_pivot(this.points[i]);
                    break;
                }
            }
        }

        this.rotation_counter++;
    }
    new_pivot(point:Point){
        let green_circle = new Circle(point,10,true,"green");
        this.green_circles.push(this.mCanvas.add(green_circle));
        this.penultimate_pivot = this.center;
        this.center = point;
        this.circ_points = [];
        for(let t = 0; t<=360; t+=1){
            this.circ_points.push(circle_point(point, t));
        }
        this.line.start = point;
    }
    start(){
        this.animation_handler = window.setInterval(()=>{
            this.rotate();
        },this.rotationSpeed);
    }
    destroy(){
        this.green_circles.forEach((handler:number)=>this.mCanvas.remove(handler));
        clearInterval(this.animation_handler);
        this.mCanvas.remove(this.line_handler);
    }
}

function makeRandomPoint(maxVal:number, minVal:number):Point{
    return {x: Math.random()*(maxVal-minVal) + minVal, y: Math.random()*(maxVal-minVal) + minVal};
}

export function createPoints(nPoints:number, mCanvas:MagmaCanvas, random:boolean){
    return new Promise((resolve, reject)=>{
        let cntr = 0;
        let points : Point[] = [];
        if(random){
            for(let i = 0; i < nPoints; i++){
                points.push(makeRandomPoint(700,100));
            }
            resolve(points);
        }else{
            mCanvas.addEventListener("click",(e:MouseEvent,circle_pos:Point)=>{
                if(cntr < nPoints){
                    points.push(circle_pos);
                    let circle = new Circle(circle_pos,10,true,"black");
                    mCanvas.add(circle);
                    cntr++;
                    if(cntr == nPoints){
                        resolve(points);
                    }
                }
            });
        }
    });
}
function line_angle(line:Line){
    if(line.slope() > 0){
        return Math.floor(Math.atan(line.slope())*(180/Math.PI))
    }else{
        return 90 + (90-Math.abs(Math.floor(Math.atan(line.slope())*(180/Math.PI))));
    }
}
export function pivotAnimation(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let wmHandler : PivotingWindmill = null;

    createPoints(6, mCanvas, true ).then((points:Point[])=>{
        let line : Line = null;
        let lineHandler : number = null;
        let active = false;
        points.forEach((point:Point)=>{
            let circle = new Circle(point,10,true,"black");
            points.push(point);
            mCanvas.addEventListener("click",(e:MouseEvent,pos:Point)=>{
                active = !active;
                 // We already clicked once, we are now starting the simulation. 
                 if(wmHandler != null){
                    wmHandler.destroy();
                }
                mCanvas.addEventListener("mousemove",(e2:MouseEvent,pos2:Point)=>{
                    if(active){
                        if(line == null){
                            line = new Line(point,pos2,2,true,"red");
                            lineHandler = mCanvas.add(line);
                        }else{
                            line.start = point;
                            line.end = pos2;
                        }
                    }
                });
            }, mCanvas.add(circle));
        });
        mCanvas.addEventListener("click",(e:MouseEvent,pos:Point)=>{
            if(line != null){
                wmHandler = new PivotingWindmill(line.start, mCanvas, points, line_angle(line));
                wmHandler.start();
                mCanvas.remove(lineHandler);
                line = null;
                active = false;
            }
        });
    });
}