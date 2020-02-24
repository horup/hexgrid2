import { Scene, Engine, FreeCamera, Vector3, Mesh, HemisphericLight, UniversalCamera, ArcRotateCamera, ActionManager, ExecuteCodeAction, Camera, SphereBuilder } from 'babylonjs';
import createWorldAxis from './createWorldAxis';
import createCamera from './createCamera';
import updateHexGrid from './updateHexGrid';
import * as Honeycomb from 'honeycomb-grid';

let canvas = document.getElementById("render") as HTMLCanvasElement;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});
let scene = new Scene(engine);

const HexFactory = Honeycomb.extendHex({
    orientation:'flat',
    size:{xRadius:0.5, yRadius:0.5},
    depth:0
});

const GridFactory = Honeycomb.defineGrid(HexFactory);
let grid = GridFactory.rectangle({width:16, height:10});


let c = 1;
for (let hex of grid)
{
    hex.depth = hex.x / 5 + 0.1;
}

createWorldAxis(scene); 
updateHexGrid(grid, scene);
createCamera(16, scene);

engine.runRenderLoop(()=>
{
    scene.render();
});

window.onresize = ()=>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize(null);