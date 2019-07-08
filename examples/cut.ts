import {Point,Line,MagmaCanvas,Shapes,Circle} from "magma-canvas";

function randomPoint(xMin:number,xMax:number,yMin:number,yMax:number):Point{
    return {x:Math.ceil(Math.random()*(xMax-xMin))+xMin,y:Math.ceil(Math.random()*(yMax-yMin))+yMin};
}
export function randomCuts(){
    let lines  : Line[]           = [];
    let guideLineID : number      = null;
    let pointHandlers : number [] = [];
    const canvasDim               = 800
    const mCanvas                 = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    let plane                     = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2);
    let planeHandler              = mCanvas.add(plane);

    setInterval(()=>{
        let line = new Line(randomPoint(200,600,200,600),randomPoint(200,600,200,600),1,true);
        mCanvas.add(line);
        lines.push(line);
        let a = plane.splitBy(line)[0];
        let b = plane.splitBy(line)[1];
        a.fillColor = `rgb(${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)})`;
        b.fillColor = `rgb(${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)})`;
        let ref = mCanvas.addList([a,b]);
    },90);
}

export function cutExample(){
    let points : Point[]          = [];
    let lines  : Line[]           = [];
    let guideLineID : number      = null;
    let pointHandlers : number [] = [];
    const canvasDim               = 800
    const mCanvas                 = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    let plane                     = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2);
    let planeHandler              = mCanvas.add(plane);

    mCanvas.addEventListener("click",(_:MouseEvent,pos:Point)=>{
        pointHandlers.push(mCanvas.add(new Circle(pos,10)));
        points.push(pos);
        if(points.length == 2){
            let line = new Line(points[0],points[1],1,true);
            mCanvas.add(line);
            lines.push(line);
            points = [];
            mCanvas.removeList(pointHandlers);
            mCanvas.remove(planeHandler);
            let a = plane.splitBy(line)[0];
            let b = plane.splitBy(line)[1];
            a.fillColor = "blue";
            let ref = mCanvas.addList([b,a]);
            let orthMaker = (x:number) => {
                return {x:x,y:(-1/line.slope())*x+400}
            };

            // Make an orthogonal line that goes through. 
            let targetPoint = a.points[2];
            let newX = targetPoint.x - (a.points[2].x - a.points[3].x)*2;
            let newY = (-1/line.slope())*(newX - targetPoint.x) + targetPoint.y
            let newPoint = {x:newX,y:newY};
            mCanvas.add(new Circle(newPoint,10));   
            mCanvas.add(new Line(newPoint,targetPoint,1,true));

            a.points[2].x = newPoint.x;
            a.points[2].y = newPoint.y;

            // Make an orthogonal line that goes through. 
            let targetPoint2 = a.points[1];
            let newX2 = targetPoint2.x - (targetPoint2.x - a.points[0].x)*2;
            let newY2 = (-1/line.slope())*(newX2 - targetPoint2.x) + targetPoint2.y
            let newPoint2 = {x:newX2,y:newY2};
            mCanvas.add(new Circle(newPoint2,10));   
            mCanvas.add(new Line(newPoint2,targetPoint2,1,true));
            mCanvas.add(new Circle(a.points[1],10)); 

            a.points[1].x = newPoint2.x;
            a.points[1].y = newPoint2.y;

            //let orthLine = new Line(orthMaker(0),orthMaker(800),1,true);
            //mCanvas.add(orthLine);
            let k = {...a.points[2]};
            //k.x = k.x-a.points[3].x;
            //mCanvas.add(new Circle(k,10));
            k.x -= (a.points[2].x - a.points[3].x)*2;
            mCanvas.add(new Circle(k,10));   
            mCanvas.add(new Circle(a.points[2],10));   
            mCanvas.add(new Circle(a.points[3],10));   

       
        }
    });
    mCanvas.addEventListener("mousemove",(_:MouseEvent,pos:Point)=>{
        if(points.length == 1){
            if(guideLineID != null){
                mCanvas.remove(guideLineID);
            }
            guideLineID = mCanvas.add(new Line(points[0],pos,1,true));
        }
    });
}