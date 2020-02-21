import { Scene, Mesh, HemisphericLight, Vector3, Axis, Space, MeshBuilder } from "babylonjs";

/** Creates a hexgrid of the given size */
export default (size:number, scene:Scene)=>
{
    const light = new HemisphericLight('light1', new Vector3(0, 0, 1), scene);
    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            let h = 2;
            let cylinder = MeshBuilder.CreateCylinder("1", {height:1, tessellation:6}, scene);//Mesh.CreateCylinder('1', 1, 1, 1, 6, 1, scene);
            cylinder.rotation.x = Math.PI/2;
            cylinder.scaling.y = 10;
            cylinder.position.z = h/2;
            let s = Math.random()*3 + 0.1;
            cylinder.scaling.y = s;
            cylinder.position.x = x - x / 4;
            cylinder.position.y = (x % 2 == 0 ? y : y + 0.5) * 0.8;
            cylinder.position.z = cylinder.scaling.y / 2;
        }
    }

    let ground = Mesh.CreateGround("ground", 1, 1, 1, scene);
    ground.rotate(Axis.X, Math.PI / 2, Space.LOCAL);
    ground.setPivotPoint(new Vector3(-0.5,0,0.5));
    ground.scaling.z = size;
    ground.scaling.x = size;
}