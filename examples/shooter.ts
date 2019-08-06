import { MagmaCanvas, Circle, Point, PointFn, Target, Grid } from "magma-canvas";

function shoot(pos:Point,target:Target,mCanvas:MagmaCanvas,delay=0,ringEffect=true,hitCounter={nHits:0,score:0}){
    let prevHandler : number = null;
    const radius_start = 400;
    const interval_time = 20;
    let radius = radius_start;
    let minRadius = 5;
    let _interval = setInterval(()=>{
        if(prevHandler != null){
            mCanvas.remove(prevHandler);
        }
        radius-=radius_start/(delay/interval_time);
        if( radius <= minRadius){
            //let psn : Point | PointFn = pos;
            let color = "red"
            if(target.contains(pos)){
                // We hit the target. 
                color = "green";
                target.add(new Circle(pos,minRadius,true,color));
                hitCounter.nHits += 1;
                hitCounter.score += target.score(pos);
            }else{
                mCanvas.add(new Circle(pos,minRadius,true,color),0);
            }

            clearInterval(_interval);
        }
        else{
            if(ringEffect){
                prevHandler = mCanvas.add(new Circle(pos,radius,true,"rgba(0,0,0,0.25)"));
            }
        }
    },interval_time);  
}
export function shooter(){
    const canvasDim = 800; 
    const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,false);
    let goRight = true;
    let target = new Target({x:canvasDim/2,y:canvasDim/2});
    mCanvas.add(target);

    let rightBoundary = canvasDim-target.radius;
    let leftBoundary = target.radius;
    setInterval(()=>{
        if(target.center().x > rightBoundary || target.center().x < leftBoundary){
            goRight = !goRight;
        }
        if(goRight){
            target.center({x:target.center().x+1,y:target.center().y});
        }else{
            target.center({x:target.center().x-1,y:target.center().y});
        } 
    },10);
  
    mCanvas.addEventListener("click",(e: MouseEvent, pos: Point)=>{
        shoot(pos,target,mCanvas,1000,true);
    });
}

export interface SimulationResult{
    pHit:number;
    score:number;
}
export function simResultDisplay(results:SimulationResult,nShots:number){
    let target = new Target({x:0,y:0});
    console.log(`P(hit)=nHits/nShots=${results.pHit}`);
    console.log(`Area(target)/Area(Ω)=${target.area/(800**2)}`);
    console.log(`Score:${results.score}`);
    console.log(`E[S]=${expectedScore(target,800**2)*nShots}`);
}
// Expected score for a random shooter. 
export function expectedScore(target:Target,omegaArea:number){
    let rings = target.targetRings;
    let e = 0;
    for(let i = rings.length-1; i >= 0; i--){
        let prob = 0;
        if(i == rings.length-1){
            prob = rings[i].area/omegaArea;
        }else{
            prob = (rings[i].area-rings[i+1].area)/omegaArea;
        }
        e += ((i+1)/rings.length)*prob;
    }
    return e;
}

let goRight = true;
export function targetMotion(target:Target,t:number){
    let rightBoundary = 800-target.radius;
    let leftBoundary = target.radius;

    if(target.center().x > rightBoundary || target.center().x < leftBoundary){
        goRight = !goRight;
    }
    if(goRight){
        target.center({x:target.center().x+1,y:target.center().y});
    }else{
        target.center({x:target.center().x-1,y:target.center().y});
    } 
}
export function shotFunction(t:number){
    return {x:Math.random()*800,y:Math.random()*800};
}

export function plotSim(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    const grid       = new Grid(canvasDim,canvasDim);
    mCanvas.add(grid);
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    
    const nTrials = 1000;
    let trials:SimulationResult[] = [];
    for(let i = 0; i<nTrials; i++){
        shootingSimulator(targetMotion,shotFunction,{x:400,y:400},1000,0,false).then((result)=>{
            trials.push(result);
            if(trials.length == nTrials){
                binCount(100,trials.map((trial)=>trial.pHit)).forEach((binCount,i)=>grid.plot({x:i-50,y:binCount/2}));
            }
        });
    }
    

}

export function shootingSimulator(targetMotionFn:Function,shotFunction:Function,startingLocation:Point,
                                  nShots:number,delay:number,show:boolean){
    return new Promise<SimulationResult>(function(resolve,reject){
        if(show){
            const canvasDim = 800; 
            const mCanvas   = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,false);
            let target = new Target({x:canvasDim/2,y:canvasDim/2});
            mCanvas.add(target);
    
            let t = 0;
            let totalScore = 0;
            let shotCounter = 0;
            let hits = 0;
            let _handler = setInterval(()=>{
                if(shotCounter < nShots){
                    targetMotionFn(target,t);
                    let shotLoc = shotFunction(t);
                    if(shotLoc != null){
                        let shotScore = target.score(shotLoc);
                        shoot(shotLoc,target,mCanvas,delay,true);
                        if(shotScore != 0){
                            hits++;
                            totalScore += shotScore;
                        }
                    }
                    t++;
                    shotCounter++;
                }else{
                    clearInterval(_handler);
                    resolve({pHit:hits/nShots,score:totalScore});
                }
            },0);
    
        }else{
            let target = new Target(startingLocation);
            let t = 0;
            let totalScore = 0;
            let shotCounter = 0;
            let hits = 0;
            while(shotCounter < nShots){
                targetMotionFn(target,t);
                let shotLoc = shotFunction(t);
                if(shotLoc != null){
                    let shotScore = target.score(shotLoc);
                    if(shotScore != 0){
                        hits++;
                        totalScore += shotScore;
                    }
                    shotCounter++;
                }
                t++;
            }
            resolve({pHit:hits/nShots,score:totalScore});
        }
    });
}
function truncFloor(num:number){
    if(num == 0){
        return 0;
    }else if(num % 1 == 0){
        return num - 1;
    }else{
        return Math.floor(num);
    }
}
function binCount(nBins:number,input:number[]){
    let binWidth = Math.max(...input)/nBins;
    let bins = Array<Array<number>>(nBins);
    for(let i = 0; i < nBins; i++){
        bins[i] = [];
    }
    input.forEach((num)=>{
        console.log(binWidth);
        bins[truncFloor(num/binWidth)].push(num);
    });
    return bins.map((ls)=>ls.length);
}