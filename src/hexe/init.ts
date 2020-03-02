import * as BABYLON from 'babylonjs';
import { initCamera, initWorldAxis } from '.';
export function init(scene:BABYLON.Scene, canvas:HTMLCanvasElement)
{
    initWorldAxis(scene); 
    initCamera(16, scene, canvas);
}