import { MagmaCanvas,Line,Point } from "magma-canvas";
export function orthLine(){
    const canvasDim = 800;
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    let line = new Line({x:200,y:0},{x:200,y:100},2,true,"blue");
    mCanvas.add(line);
    let line2 = line.orthLine({x:200,y:200},2,true,"red");
    mCanvas.add(line2);
    
}
export function randOrthLines(){
    const canvasDim = 800;
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,true);
    let posRand = () => Math.ceil(Math.random()*canvasDim);
    for(let i = 0; i < 100; i++){
        let line = new Line({x:posRand(),y:posRand()},{x:posRand(),y:posRand()},2,true,"blue");
        mCanvas.add(line);
        let line2 = line.orthLine({x:posRand(),y:posRand()},2,true,"red");
        mCanvas.add(line2);
    }
}