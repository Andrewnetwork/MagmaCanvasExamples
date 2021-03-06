import { Point,Line,Circle,Shapes,Polygon,MagmaCanvas,Animator, Target } from "magma-canvas";
import {cutExample,randomCuts,dragCut} from "./cut";
import {axesTransformShapes} from "./axesTransformShapes";
import {orthLine,randOrthLines} from "./orthLine";
import {pointOfIntersection} from "./lines";
import {buttonTest, formTest} from "./canvasObjects";
import {rippleCursor} from "./ripple";
import {bubbles} from "./opacityTricks";
import { pivotAnimation } from "./pivotAnimation";
import {cellular_automata, cellular_automata_2D} from"./cellular_automata";

let select = document.createElement("select");
let selected_events = new Map<string, Function>();

function start(){
    document.getElementById("exampleSelection").appendChild(select);
    //animationExample(ex2);
    //cutExample();
    //follow();
    //circleSim();
    //graph();
    //editRect();
    //randomDraw();
    //randomCuts();
    //axesTransformShapes(3);
    //orthLine();
    //randOrthLines();
    //pointOfIntersection();
    //dragCut();  
    //buttonTest();
    //formTest();
    //rippleCursor();
    //shooter();
    //bubbles();
    //plot();
    //smoke();
    // let trials = [];
    // for(let i = 0; i<1000; i++){
    //     trials.push(shootingSimulator(targetMotion,shotFunction,{x:400,y:400},1000,0,false));
    // }
    // console.log(trials);
    // let nShots = 10000;
    // shootingSimulator(targetMotion,shotFunction,{x:400,y:400},nShots,0,true)
    //     .then((results:SimulationResult)=>simResultDisplay(results,nShots));
    add_option("Pivot Animation", pivotAnimation);
    add_option("Bubbles", bubbles);
    add_option("Cellular Automata", cellular_automata);
    add_option("Cellular Automata 2D", cellular_automata_2D);

    selected_events.get("Cellular Automata 2D")();
    select.value = "Cellular Automata 2D";
    select.onchange = () => {
        document.getElementById("canvasContainer").innerHTML = "";
        selected_events.get(select.value)();
    }
}

function add_option(caption:string, fn:Function){
    let option = document.createElement("option");
    option.innerHTML = caption;
    option.value = caption;
    select.add(option);
    selected_events.set(caption, fn);
}



function editRect(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    /*
    let rect         = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2); 
    mCanvas.add(rect);
    rect.points.forEach((point)=>{
        let p = Shapes.makeRect(point.x-10,point.y-10,20,20);
        p.fillColor = "grey";
        mCanvas.add(p);
    });*/

}
function circleSim(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    function ballDrop(startPos:Point){
        let circ = new Circle({x:startPos.x,y:startPos.y},10);
        mCanvas.add(circ);
        let a = 9.8;
        let t = 0;
        let iHandler = setInterval(()=>{
            let center = <Point>circ.center();
            if(center.y + 10 <= 800){
                center.y += (a*Math.sin(t**2))/2;
                t+=0.01;
            }else{
                center.y = 790;
                clearInterval(iHandler);
            }
        },0);
    }
    let ignoreCounter = 0;

    mCanvas.addEventListener("mousemove",(_,pos)=>{
        if(ignoreCounter == 0){
            ballDrop(pos);
        }else if(ignoreCounter >= 10){
            ignoreCounter = -1;
        }

        ignoreCounter+=1;
    });

  
}
function randomDraw(){
    const canvasDim  = 800
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true,false);
    const maxPoints = 10;
    const nPoly = 3;
    let polys:Polygon[] = [];
    let randFn = ()=> Math.random()*canvasDim;
    for(let i = 0; i < nPoly; i++){
        let nPoints = Math.floor(Math.random()*maxPoints)
        let points : Point[] = [];
        for(let j = 0; j < nPoints; j++){
            points.push({x:randFn(),y:randFn()});
        }
        let poly = new Polygon(points,true,`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.random()})`);
        polys.push(poly);
        mCanvas.add(poly);
    }
    let alt = true;
    setInterval(()=>{
        polys.forEach((poly)=>{
            poly.points.forEach((point)=>{
                if(alt){
                    point.x += Math.random();
                    point.y += Math.random();
                    alt = !alt;
                }else{
                    point.x -= Math.random();
                    point.y -= Math.random();
                    alt = !alt;
                }
               
            });
        });
        mCanvas.render();
    },0);
}

function follow(){
    const canvasDim  = 800
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let rect         = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2); 
    let rectHandler  = mCanvas.add(rect);
    mCanvas.addEventListener("mousemove",(_,pos)=>{
        let centerPoint = rect.center();
        
        rect.points.forEach((point)=>{
            point.x = point.x + pos.x - centerPoint.x;
            point.y = point.y + pos.y - centerPoint.y;
        });
    });
}
function weird(){
    const canvasDim  = 800
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let polygonHandler : number = null; 
    mCanvas.addEventListener("mousemove",(_,pos)=>{
        if(polygonHandler!=null){
            mCanvas.remove(polygonHandler);
        }
        polygonHandler = mCanvas.add(new Polygon([{x:pos.x,y:pos.y},{x:pos.x+500,y:pos.y},{x:pos.y,y:pos.x+500}]));
    });
}
function animationExample(exFn:(a:number,b:Animator,c:MagmaCanvas)=>void){
    const canvasDim  = 800
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let animator     = new Animator();

    exFn(canvasDim,animator,mCanvas);
}
function ex2(canvasDim:number,animator:Animator,mCanvas:MagmaCanvas){
    let plane        = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2);
    let planeHandler = mCanvas.add(plane);
    
    animator.addFrame(()=>plane.center().x > 800,()=>mCanvas.move(planeHandler,{x:1,y:1}));
    animator.start();
}
function ex1(canvasDim:number,animator:Animator,mCanvas:MagmaCanvas){
    let plane        = Shapes.makeRect(canvasDim/4,canvasDim/4,canvasDim/2,canvasDim/2);
    let planeHandler = mCanvas.add(plane);

    animator.addFrame(()=>plane.center().x > 800,()=>mCanvas.move(planeHandler,{x:1,y:1}));
    animator.startLoop(2);
    animator.addFrame(()=>plane.center().y < 0,()=>mCanvas.move(planeHandler,{x:0,y:-1}));
    animator.addFrame(()=>plane.center().x < 0,()=>mCanvas.move(planeHandler,{x:-1,y:0}));
    animator.addFrame(()=>plane.center().y > 800,()=>mCanvas.move(planeHandler,{x:0,y:1}));
    animator.addFrame(()=>plane.center().x > 800,()=>mCanvas.move(planeHandler,{x:1,y:0}));
    animator.endLoop();
    animator.addFrame(()=>plane.center().x == 400,()=>mCanvas.move(planeHandler,{x:-1,y:-1.5}));
    animator.addFrame(()=>false,()=>mCanvas.move(planeHandler,{x:-1,y:-1.5}));
    animator.start();
}
window.addEventListener("DOMContentLoaded",start);