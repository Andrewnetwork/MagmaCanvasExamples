import {Point,Line,MagmaCanvas,Shapes,Circle} from "magma-canvas";

export function cutExample(){
    let points : Point[]          = [];
    let lines  : Line[]           = [];
    let guideLineID : number      = null;
    let pointHandlers : number [] = [];
    const canvasDim               = 800
    const mCanvas                  = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
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
            let ref = mCanvas.add(plane.splitBy(line)[0]);
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