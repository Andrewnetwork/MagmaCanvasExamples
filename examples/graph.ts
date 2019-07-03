import { MagmaCanvas,Grid} from "magma-canvas";

export function graph(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    const grid       = new Grid(canvasDim,canvasDim);
    grid.attach(mCanvas);   
}