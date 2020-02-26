import { Scene, Engine, FreeCamera, Vector3, Mesh, HemisphericLight, UniversalCamera, ArcRotateCamera, ActionManager, ExecuteCodeAction, Camera, SphereBuilder, Color3, LoadFileError } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import * as BABYLONLoaders from "babylonjs-loaders";
import 'babylonjs-loaders';
import createWorldAxis from './createWorldAxis';
import createCamera from './createCamera';
import updateHexGrid from './updateHexGrid';
import * as Honeycomb from 'honeycomb-grid';
declare var require;
const stl = 
{
    locust:require("../stl/locust.stl") as string;
}

let canvas = document.getElementById("render") as HTMLCanvasElement;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});
let scene = new Scene(engine);

const HexFactory = Honeycomb.extendHex({
    orientation:'flat',
    size:{xRadius:0.5, yRadius:0.5},
    depth:0.1,
    color:Color3.Green()
});

const GridFactory = Honeycomb.defineGrid(HexFactory);
const width = 16, height = 16;
let grid = GridFactory.rectangle({width:width, height:height});

grid.forEach(hex=>
{
    const grass = Color3.FromHexString("#4F7942");
    const rock = Color3.FromHexString("#969FB2");
    const water = Color3.FromHexString("#45B1CB");
    hex.color = grass;
    let r = 3;
    if ((hex.x == 0 || hex.y == 0) || (hex.x == width-1 || hex.y == height-1) )
    {
        hex.depth = 1;
        hex.color = rock;
    }
    else if ((hex.x >= width/2 - r && hex.x <= width/2 +r) && (hex.y >= height/2 - r && hex.y <= height/2 +r))
    {
        hex.depth = 0.01;
        hex.color = water;
    }
    
    if (hex.x == width/2 && hex.y == height/2)
    {
        hex.depth = 2;
        hex.color = rock;
    }
});


const loader = new BABYLONLoaders.STLFileLoader();
let meshes = [];
/*
let cam = new ArcRotateCamera("cam1", 0, 0, 100, new Vector3(0,0,0), scene);
cam.attachControl(canvas);*/

BABYLON.SceneLoader.Load("/", stl.locust.substr(1, stl.locust.length-1), engine, (s)=>
{
    let mesh = s.meshes[0];
    mesh.position.x = 2;
    mesh.position.y = 2;
    mesh.rotation.x = Math.PI/2;
    scene.addMesh(mesh);
});


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