import { MagmaCanvas, Circle, Point, PointFn } from "magma-canvas";

function randNum(){
    if(Math.random()<=0.5){
        return -Math.random()*10;
    }else{
        return Math.random()*10;
    }
}

function bubble(mCanvas:MagmaCanvas,canvasDim:number){
    let prevHandler : number = null;
    const radius_start = 200;
    const interval_time = 20;
    let radius = radius_start;
    let minRadius = 5;
    let delay = 10000;
    let pos = {x:canvasDim/2,y:canvasDim/2};
    
    let _interval = setInterval(()=>{
        if(prevHandler != null){
            mCanvas.remove(prevHandler);
        }
        radius-=radius_start/(delay/interval_time);
        if( radius <= minRadius){
            clearInterval(_interval);
        }
        else{
            pos = {x:pos.x+randNum(),y:pos.y+randNum()};
            prevHandler = mCanvas.add(new Circle(pos,radius,true,"rgba(65,105,255,0.05)"));
        }
    },interval_time);  
}
export function bubbles(){
    const canvasDim = 800; 
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,false);
    setInterval(()=>{
        bubble(mCanvas,canvasDim);
    },200)
   
}