import { Scene, Vector3, UniversalCamera, ActionManager, ExecuteCodeAction } from "babylonjs";

/** Creates a camera which looks down from the Z axis */
export default (hexgridSize:number, scene:Scene)=>
{
    let cam = new UniversalCamera("cam1", new Vector3(0,0,hexgridSize*2), scene);
    cam.setTarget(new Vector3(0,0,0));
    cam.rotation.z = Math.PI;
    cam.position.x = hexgridSize/2;
    cam.position.y = hexgridSize/2;

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
        let speed = 0.1;
        cam.position.x += (map["a"] || map ["a"]) ? -speed : 0;
        cam.position.x += (map["d"] || map ["d"]) ? speed : 0;
        cam.position.y += (map["w"] || map ["w"]) ? -speed : 0;
        cam.position.y += (map["s"] || map ["s"]) ? speed : 0; 
    });
}