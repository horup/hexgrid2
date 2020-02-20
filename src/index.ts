import { Scene, Engine, FreeCamera, Vector3, Mesh, HemisphericLight, UniversalCamera, ArcRotateCamera, ActionManager, ExecuteCodeAction, Camera, SphereBuilder } from 'babylonjs';

import showWorldAxis from './showWorldAxis';

let canvas = document.getElementById("render") as HTMLCanvasElement;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});

const createScene = (e:Engine) =>
{
    let size = 16;
    let scene = new Scene(e);
   

    let light = new HemisphericLight('1', new Vector3(0, 0, 1), scene);
   
    let cam = new UniversalCamera("cam1", new Vector3(0,0,size*2), scene);
    cam.setTarget(new Vector3(0,0,0));
    cam.rotation.z = Math.PI;
    cam.position.x = size/2;
    cam.position.y = size/2;

    let meshes:Mesh[] = [];
    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            let cylinder = Mesh.CreateCylinder('1', 1, 1, 1, 6, 1, scene);
            cylinder.rotation.x = Math.PI/2;
            let s = x + y + 0.1;//Math.random() * 5;
            cylinder.scaling.y = s;
            cylinder.position.x = x - x / 4;
            cylinder.position.y = (x % 2 == 0 ? y : y + 0.5) * 0.8;
            meshes.push(cylinder);
        }
    }


    let map = {};
    scene.actionManager = new ActionManager(scene);
    scene.actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => 
    {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => 
    {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.registerBeforeRender(()=>
    {
        let speed = 0.1;
        cam.position.x += (map["a"] || map ["a"]) ? -speed : 0;
        cam.position.x += (map["d"] || map ["d"]) ? speed : 0;
        cam.position.y += (map["w"] || map ["w"]) ? -speed : 0;
        cam.position.y += (map["s"] || map ["s"]) ? speed : 0; 
    });
/*
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));*/



    return scene;
}

let scene = createScene(engine);
showWorldAxis(3, scene); 

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