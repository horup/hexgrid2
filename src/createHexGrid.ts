import { Scene, Mesh, HemisphericLight, Vector3 } from "babylonjs";

/** Creates a hexgrid of the given size */
export default (size:number, scene:Scene)=>
{
    const light = new HemisphericLight('light1', new Vector3(0, 0, 1), scene);
    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            let cylinder = Mesh.CreateCylinder('1', 1, 1, 1, 6, 1, scene);
            cylinder.rotation.x = Math.PI/2;
            let s = x + y + 0.1;
            cylinder.scaling.y = s;
            cylinder.position.x = x - x / 4;
            cylinder.position.y = (x % 2 == 0 ? y : y + 0.5) * 0.8;
        }
    }
}