import * as BABYLON from 'babylonjs';

export const getRoot = (scene:BABYLON.Scene)=>
{
    const id = "root";
    let node = scene.getNodeByID(id) as BABYLON.TransformNode;
    node ? node = node : node = new BABYLON.TransformNode(id, scene);
    node.scaling.y = -1;
    node.scaling.x = -1;
    scene.useRightHandedSystem = false;

    return node;
}