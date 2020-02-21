import { Scene, Mesh, HemisphericLight, Vector3, Axis, Space, MeshBuilder, Color3 } from "babylonjs";
import * as BABYLON from 'babylonjs';
// https://coopdigitalblog.files.wordpress.com/2018/01/sec_palette-634px.png?w=636
/** Creates a hexgrid of the given size */
export default (size:number, scene:Scene)=>
{
    const light = new HemisphericLight('light1', new Vector3(1, 0, 1), scene);
    
    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            let cylinder = MeshBuilder.CreateCylinder("1", {height:1, tessellation:6}, scene);//Mesh.CreateCylinder('1', 1, 1, 1, 6, 1, scene);
            cylinder.convertToFlatShadedMesh();
            cylinder.rotation.x = Math.PI/2;
            cylinder.scaling.y = 10;
            let s = Math.random()*4 + 0.1;
            cylinder.scaling.y = s;
            cylinder.position.x = x - x / 4;
            cylinder.position.y = (x % 2 == 0 ? y : y + 0.5) * 0.8;
            cylinder.position.z = s / 2 + 0.5;

            const hexMaterial = new BABYLON.StandardMaterial('hexMaterial', scene);
            if (s > 3)
            {
                hexMaterial.diffuseColor = Color3.FromHexString("#DDDDDD");
            }
            else if (s > 2)
            {
                hexMaterial.diffuseColor = Color3.FromHexString("#CCCCCC");
            }
            else if (s > 1)
            {
                hexMaterial.diffuseColor = Color3.FromHexString("#4F820D");
            }
            else
            {
                hexMaterial.diffuseColor = Color3.FromHexString("#72DCD8");
            }
            cylinder.material = hexMaterial;
        }
    }

    let ground = Mesh.CreateGround("ground", 1, 1, 1, scene);
    ground.rotate(Axis.X, Math.PI / 2, Space.LOCAL);
    ground.setPivotPoint(new Vector3(-0.5,0,0.5));
    ground.scaling.z = size;
    ground.scaling.x = size;
}