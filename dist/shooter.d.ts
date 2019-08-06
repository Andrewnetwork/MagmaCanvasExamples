import { Point, Target } from "magma-canvas";
export declare function shooter(): void;
export interface SimulationResult {
    pHit: number;
    score: number;
}
export declare function simResultDisplay(results: SimulationResult, nShots: number): void;
export declare function expectedScore(target: Target, omegaArea: number): number;
export declare function targetMotion(target: Target, t: number): void;
export declare function shotFunction(t: number): {
    x: number;
    y: number;
};
export declare function plotSim(): void;
export declare function shootingSimulator(targetMotionFn: Function, shotFunction: Function, startingLocation: Point, nShots: number, delay: number, show: boolean): Promise<SimulationResult>;
