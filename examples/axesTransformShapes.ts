import { MagmaCanvas,Grid,Circle,Polygon,Point} from "magma-canvas";
import { string } from "prop-types";

class PairValueMap<K,Value>{
    map:Map<K,[K,Value][]>;
    constructor(){
        this.map = new Map<K,[K,Value][]>();
    }
    addValue(k1:K,k2:K,value:Value){
        if(this.map.get(k1) == undefined){
            this.map.set(k1,[]);
        }
        if(this.map.get(k2) == undefined){
            this.map.set(k2,[]);
        }
        this.map.get(k1).push([k2,value]);
        this.map.get(k2).push([k1,value]);
    }
    getValue(key:K):[K,Value][]{
        return this.map.get(key);
    }
}
function zipCommon(arry1:[string,number][],arry2:[string,number][]):[string,number,number][]{
    let commonOut : [string,number,number][] = [];
    for(let i=0; i<arry1.length;i++){
        for(let j=0;j<arry2.length;j++){
            if(arry1[i][0] == arry2[j][0]){
                commonOut.push([arry1[i][0],arry1[i][1],arry2[j][1]]);
            }
        }
    }
    return commonOut;
}
export function axesTransformShapes(n:number){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer",canvasDim,canvasDim,true);
    let axes = [];
    for(let i = 0; i <= n; i++){
        axes.push(i.toString());
    }
    let sim = new PairValueMap<string,number>();
    let pairs : [string,string][]= [];
    for(let i = 0; i < axes.length; i++){
        for(let j = i+1; j < axes.length; j++){
            sim.addValue(axes[i],axes[j],Math.ceil(Math.random()*canvasDim));
            pairs.push([axes[i],axes[j]]);
        }
    }
    let randomColor = () => `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    pairs.forEach((pair)=>{
        zipCommon(sim.getValue(pair[0]),sim.getValue(pair[1])).forEach((pt:[string,number,number])=>{
            mCanvas.add(new Circle({x:pt[1],y:pt[2]},10,true,randomColor()));
        });
    })
}