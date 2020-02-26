import { Scene, Mesh, HemisphericLight, Vector3, Axis, Space, MeshBuilder, Color3, TransformNode } from "babylonjs";
import * as BABYLON from 'babylonjs';
import { Grid, Hex } from "honeycomb-grid";
// https://coopdigitalblog.files.wordpress.com/2018/01/sec_palette-634px.png?w=636
/** Creates a hexgrid in 3D with the given grid */

interface Hex3D
{
    orientation:string;
    depth:number;
    size:
    {
        xRadius:number;
        yRadius:number;
    };
    color:Color3;
}

/** Updates (or creates) the hexgrid in 3D */
export default (grid: Grid<Hex<Hex3D>>, scene:Scene)=>
{
    const id = "hexgrid";
    let node = scene.getNodeByID(id) as TransformNode; 
    node ? node : node = new TransformNode(id);
    //node.rotation.x = Math.PI/2;
    
    let width = 0;
    let height = 0;
    for (let hex of grid)
    {
        let hexId = hex.x + "," + hex.y;
        let cylender = scene.getMeshByID(hexId) as Mesh;
        let cylinder = cylender ? cylender : MeshBuilder.CreateCylinder(hexId, {height:1, tessellation:6}, scene);
        cylinder.setParent(node);

        cylinder.convertToFlatShadedMesh();
        cylinder.rotation.x = Math.PI/2;
        let s = hex.depth;
        cylinder.scaling.y = s;
        cylinder.scaling.x = hex.size.xRadius * 2;
        cylinder.scaling.z = hex.size.xRadius * 2;
        cylinder.position.x = hex.toPoint().x;
        cylinder.position.y = hex.toPoint().y;
        cylinder.position.z = s / 2 + 0.5;

        const hexMaterial = new BABYLON.StandardMaterial('hexMaterial', scene);
        hexMaterial.diffuseColor = hex.color;
        cylinder.material = hexMaterial;
    }

}