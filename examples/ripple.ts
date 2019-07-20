import { MagmaCanvas, Circle, Point, PointFn } from "magma-canvas";

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
function addTarget(mCanvas:MagmaCanvas,pos:Point){
    let refs = [];
    for(let i = 10; i >= 1; i--){
        let circ = new Circle(pos,i*10,true,`rgb(${randColor()},${randColor()},${randColor()})`);
        refs.push(circ);
    }
    mCanvas.addList(refs);
    return refs;
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
function shoot(pos:Point,targetPos:Point,targetRings:Circle[],mCanvas:MagmaCanvas,delay=0,ringEffect=true){
    let prevHandler : number = null;
    const radius_start = 400;
    const interval_time = 20;
    let radius = radius_start;
    let minRadius = 5;
    let startTargetPos = {x:targetPos.x,y:targetPos.y};
    let _interval = setInterval(()=>{
        if(prevHandler != null){
            mCanvas.remove(prevHandler);
        }
        radius-=radius_start/(delay/interval_time);
        if( radius <= minRadius){
            let psn : Point | PointFn = pos
            let color = "red"
            if(targetRings.map((ring)=>ring.contains(pos)).reduce((a,b)=>a||b)){
                let x = pos.x - targetPos.x;
                let y = pos.y - targetPos.y;
                psn = () => {return {x:targetPos.x+x,y:targetPos.y+y}};
                color = "green";
            }
            mCanvas.add(new Circle(psn,minRadius,true,color));
            clearInterval(_interval);
        }
        else{
            if(ringEffect){
                prevHandler = mCanvas.add(new Circle(pos,radius,true,"rgba(0,0,0,0.5)"));
            }
        }
    },interval_time);  
}
export function shooter(){
    const canvasDim = 800; 
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let targetPos   = {x:canvasDim/2,y:canvasDim/2}
    let goRight = true;
    let targetRings = addTarget(mCanvas,targetPos);

    setInterval(()=>{
        if(targetPos.x > canvasDim || targetPos.x < 0){
            goRight = !goRight;
        }
        if(goRight){
            targetPos.x++;
            targetPos.y = targetPos.y+Math.cos(targetPos.x/100);
        }else{
            targetPos.x--;
            targetPos.y = targetPos.y-Math.cos(targetPos.x/100);
        } 
    },10);

    setInterval(()=>{
        shoot({x:targetPos.x,y:targetPos.y},targetPos,targetRings,mCanvas,9000,false);
    },10);
    // mCanvas.addEventListener("click",(e: MouseEvent, pos: Point)=>{
    //     shoot(pos,targetPos,targetRings,mCanvas,10000,true);
    // });
}