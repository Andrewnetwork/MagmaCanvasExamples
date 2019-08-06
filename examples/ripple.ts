import { MagmaCanvas, Circle, Point } from "magma-canvas";

function makeRipple(pos:Point,mCanvas:MagmaCanvas,max:number){
    let handler: number = null;
    let i = 1;
    let refs : number[] = [];
    handler = window.setInterval(()=>{
        refs.push(mCanvas.add(new Circle(pos,i*10,true,`rgba(0,0,0,${i/100})`)));
        i++;
        if(i >= max){
            clearInterval(handler);
            refs.forEach((ref)=>{
                mCanvas.remove(ref);
            });
        }
    },50);
}
function randColor(){
    return Math.floor(Math.random()*255);
}
function makeRippleColor(pos:Point,mCanvas:MagmaCanvas,max:number){
    let handler: number = null;
    let i = 1;
    let refs : number[] = [];
    
    handler = window.setInterval(()=>{
        refs.push(mCanvas.add(new Circle(pos,i*10,true,`rgba(${randColor()},${randColor()},${randColor()},${i/100})`)));
        i++;
        if(i >= max){
            clearInterval(handler);
            refs.forEach((ref)=>{
                mCanvas.remove(ref);
            });
        }
    },50);
}
export function rippleCursor(){
    const canvasDim  = 800; 
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let i = 1;
    let black = true;
    mCanvas.addEventListener("mousemove",(e: MouseEvent, pos: Point)=>{
        //black = !black;
        makeRipple(pos,mCanvas,10);
    });
}
export function colors(){
    const canvasDim  = 800; 
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    setInterval(()=>{
        makeRippleColor({x:Math.random()*canvasDim,y:Math.random()*canvasDim},mCanvas,15);
        makeRipple({x:Math.random()*canvasDim,y:Math.random()*canvasDim},mCanvas,7);
    },0);
}
function randNum(){
    if(Math.random()<=0.5){
        return -Math.random()*10;
    }else{
        return Math.random()*10;
    }
}
