import { Scene, Vector3, UniversalCamera, ActionManager, ExecuteCodeAction, HemisphericLight, DirectionalLight, PointLight, SpotLight, ArcRotateCamera, ArcFollowCamera, Vector2 } from "babylonjs";
import {getRoot} from './getRoot';
export const initCamera = (radius:number, scene:Scene, canvas:HTMLCanvasElement)=>
{
    const light = new HemisphericLight('light1', new Vector3(1, 1, 1), scene);
    light.parent = getRoot(scene);
    const a = -Math.PI/2;
    const b = 0;
    const cam = new ArcRotateCamera("cam1", a, b, radius*1, new Vector3(0,0,0), scene);
    cam.upVector = new Vector3(0,0,1);
    cam.attachControl(canvas);
    cam.parent = getRoot(scene);

    if (scene.actionManager == null)
        scene.actionManager = new ActionManager(scene);
    let map = {};
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
        let speed = 0.5;
        const xleft = (map["a"] || map ["a"]) ? -speed : 0;
        const xright = (map["d"] || map ["d"]) ? speed : 0;
        const forward = (map["w"] || map ["w"]) ? -speed : 0;
        const backward = (map["s"] || map ["s"]) ? speed : 0;
        //const d = cam.getDirection(new Vector3(0,-1,0));
        const p1 = new Vector3(cam.target.x, cam.target.y, 0);
        const p2 = new Vector3(cam.position.x, cam.position.y, 0);
        const v = p2.subtract(p1).normalize();
        const n = new Vector3(v.y, -v.x, 0);
        
        cam.target.x += v.x * speed * forward;
        cam.target.y += v.y * speed * forward;
        cam.target.x += v.x * speed * backward;
        cam.target.y += v.y * speed * backward;

        cam.target.x += n.x * speed * xleft;
        cam.target.y += n.y * speed * xleft;
        cam.target.x += n.x * speed * xright;
        cam.target.y += n.y * speed * xright;

        const beta = Math.PI/2.25;
        if (cam.beta > beta)
            cam.beta = beta;

        console.log(cam.beta);

        /*cam.target.x += (map["a"] || map ["a"]) ? -speed : 0;
        cam.target.x += (map["d"] || map ["d"]) ? speed : 0;
        cam.target.y += (map["w"] || map ["w"]) ? -speed : 0;
        cam.target.y += (map["s"] || map ["s"]) ? speed : 0; */


       /* const d = cam.getDirection(new Vector3(0, 0, 1));
        console.log(d);
        const n = new Vector3(-d.y, d.x, 0);
        console.log(d);
        cam.target.x += d.x * speed * forward;
        cam.target.y += d.y * speed * forward;*/
        //cam.target.y += d.z * speed * forward;
      
      //  cam.target.y += n.y * speed;
        //cam.target.y += d.y;
    });
   /* let cam = new UniversalCamera("cam1", new Vector3(0,0, 10), scene);
    cam.setTarget(new Vector3(0,-3,0));
    cam.rotation.z = Math.PI;
    cam.position.z = hexgridSize*2;
    cam.position.x = hexgridSize/2;
    cam.position.y = hexgridSize*1.5;

    

    
    

    if (scene.actionManager == null)
        scene.actionManager = new ActionManager(scene);
        
    let map = {};
    
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
        let speed = 0.5;
        cam.position.x += (map["a"] || map ["a"]) ? -speed : 0;
        cam.position.x += (map["d"] || map ["d"]) ? speed : 0;
        cam.position.y += (map["w"] || map ["w"]) ? -speed : 0;
        cam.position.y += (map["s"] || map ["s"]) ? speed : 0; 
    });*/
}