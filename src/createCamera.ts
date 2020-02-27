import { Scene, Vector3, UniversalCamera, ActionManager, ExecuteCodeAction, HemisphericLight, DirectionalLight, PointLight, SpotLight, ArcRotateCamera, ArcFollowCamera } from "babylonjs";
import getRoot from './getRoot';
export default (radius:number, scene:Scene, canvas:HTMLCanvasElement)=>
{
    const light = new HemisphericLight('light1', new Vector3(1, 1, 1), scene);
    light.parent = getRoot(scene);
    const a = -Math.PI/2;
    const b = 0;
    const cam = new ArcRotateCamera("cam1", a, b, radius*10, new Vector3(0,0,0), scene);
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
        cam.target.x += (map["a"] || map ["a"]) ? -speed : 0;
        cam.target.x += (map["d"] || map ["d"]) ? speed : 0;
        cam.target.y += (map["w"] || map ["w"]) ? -speed : 0;
        cam.target.y += (map["s"] || map ["s"]) ? speed : 0; 
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