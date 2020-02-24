import { Scene, Mesh, HemisphericLight, Vector3, Axis, Space, MeshBuilder, Color3 } from "babylonjs";
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
}

/** Creates a hexgrid in 3D with the given grid */
export default (grid: Grid<Hex<Hex3D>>, scene:Scene)=>
{
    const light = new HemisphericLight('light1', new Vector3(1, 0, 1), scene);
    let width = 0;
    let height = 0;
    for (let hex of grid)
    {
        let cylinder = MeshBuilder.CreateCylinder("1", {height:1, tessellation:6}, scene);

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
        if (s > 1.75)
        {
            hexMaterial.diffuseColor = Color3.FromHexString("#AAAAAA");
        }
        else if (s > 0.5)
        {
            hexMaterial.diffuseColor = Color3.FromHexString("#4F820D");
        }
        else
        {
            hexMaterial.diffuseColor = Color3.FromHexString("#72DCD8");
        }
        cylinder.material = hexMaterial;
    }

    let ground = Mesh.CreateGround("ground", 1, 1, 1, scene);
    ground.rotate(Axis.X, Math.PI / 2, Space.LOCAL);
    ground.setPivotPoint(new Vector3(-0.5,0,0.5));
    ground.scaling.z = 100;
    ground.scaling.x = 100;
}