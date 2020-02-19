import { Scene, Engine, FreeCamera, Vector3, Camera, Mesh, HemisphericLight, UniversalCamera, ArcRotateCamera } from 'babylonjs';

let canvas = document.getElementById("render") as HTMLCanvasElement;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});

const createScene = (e:Engine) =>
{
    let size = 16;
    let scene = new Scene(e);
   /* let cam = new FreeCamera('1', new Vector3(0, size, -size), scene);
    cam.setTarget(new Vector3(0, 0, 0));
    cam.attachControl(canvas);*/

    let light = new HemisphericLight('1', new Vector3(0, 1, 0), scene);

    let meshes:Mesh[] = [];
    for (let z = 0; z < size; z++)
    {
        for (let x = 0; x < size; x++)
        {
            let cylinder = Mesh.CreateCylinder('1', 1, 1, 1, 6, 1, scene);
            cylinder.position.x = x - x / 4;
            cylinder.position.z = (x % 2 == 0 ? z : z + 0.5) * 0.8;
            let s = Math.random() * 5;
            cylinder.scaling.y = s;
            cylinder.position.y = s / 2;
            meshes.push(cylinder);
        }
    }


    //cam.position.x = 1 + size  / 4;

    let cam = new ArcRotateCamera("cam1", -Math.PI/2, 0, size*2, new Vector3(0, 0, 0), scene);
    cam.target.set(size/2*0.7, 0, size/2*0.7);
    return scene;
}

let scene = createScene(engine);
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