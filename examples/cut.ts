import {Point,Line,MagmaCanvas,Shapes,Circle, Polygon} from "magma-canvas";

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
        a.color = `rgb(${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)})`;
        b.color = `rgb(${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)},${Math.ceil(Math.random()*255)})`;
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
            let [a,b] = plane.reflectOver(line);
            mCanvas.addList([b,a]);
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

export function dragCut(){
    const canvasDim               = 800
    const mCanvas                 = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    let plane                     = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2);
    let planeHandler              = mCanvas.add(plane);
    plane.points.forEach((point)=>{
        let circ = new Circle(point,10);
        mCanvas.add(circ,"mousemove",(_,pos)=>{
            circ.center(pos);
            plane.points[0] = pos;
        });
    });

}