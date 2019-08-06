import { MagmaCanvas,Grid } from "magma-canvas";

export function plot(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    const grid       = new Grid(canvasDim,canvasDim);
    mCanvas.add(grid);
    setInterval(()=>{
        let center = Math.random()*40;
        setInterval(()=>{
            grid.plot({x:Math.random()*(center*2)-center,y:Math.random()*(center*2)-center});
        },0);
    },100);
}
export function graph(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    const grid       = new Grid(canvasDim,canvasDim);
    mCanvas.add(grid);
    let i = 0;
    setInterval(()=>{
        grid.clearGraphs();
        grid.graph((x:number)=>Math.cos(x+i));
        grid.graph((x:number)=>Math.cos(x+i*20));
        i++;
    },60);
}