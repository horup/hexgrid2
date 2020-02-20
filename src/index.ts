import { Scene, Engine, FreeCamera, Vector3, Mesh, HemisphericLight, UniversalCamera, ArcRotateCamera, ActionManager, ExecuteCodeAction, Camera, SphereBuilder } from 'babylonjs';

import createWorldAxis from './createWorldAxis';
import createCamera from './createCamera';
import createHexGrid from './createHexGrid';

let canvas = document.getElementById("render") as HTMLCanvasElement;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});
let scene = new Scene(engine);

const size = 16;
createWorldAxis(scene); 
createHexGrid(size, scene);
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