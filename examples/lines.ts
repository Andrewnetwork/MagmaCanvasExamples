import {Point,Line,MagmaCanvas,Shapes,Circle, Polygon} from "magma-canvas";

export function pointOfIntersection(){
    const canvasDim = 800;
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    mCanvas.addEventListener("mousemove",(_:MouseEvent,pos:Point)=>{
        let line = new Line({x:0,y:0},pos,2,true,"blue");
        let orthLine = line.orthLine({x:200,y:200},2,true,"white");
        mCanvas.add(line);
        mCanvas.add(orthLine);
        //mCanvas.add(new Circle(orthLine.pointOfIntersection(line),10));
    });
}