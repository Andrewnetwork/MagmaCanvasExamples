import { MagmaCanvas,Button,TextInput,LinearLayout } from "magma-canvas";

export function formTest(){
    const canvasDim  = 800; 
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    const container  = new LinearLayout();
    const textInput  = new TextInput();
    const button     = new Button("Alert",()=>{
        alert(textInput.value);
    });
    mCanvas.add(container);
    container.add(textInput).add(button);
}

export function buttonTest(){
    const canvasDim  = 800; 
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let pos          = {x:canvasDim/2,y:canvasDim/2};
    let button       = new Button("Click Me!",()=>{
        pos.x = Math.random()*(canvasDim-300);
        pos.y = Math.random()*(canvasDim-300);
    },pos);
    mCanvas.add(button);
}