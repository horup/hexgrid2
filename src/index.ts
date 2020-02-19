import { Scene, Engine } from 'babylonjs';

let canvas = document.getElementById("render") as HTMLCanvasElement;
canvas.width = 640;
canvas.height = 480;
let engine = new Engine(canvas, false, {preserveDrawingBuffer:true, stencil:true});