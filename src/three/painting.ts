import * as THREE from 'three';
import { App } from './app';
export class Painting{
    private _mesh: THREE.Mesh;

    constructor(texture:string,size:number[],position:number[],rotation:number[]) {
        const loader = new THREE.TextureLoader()

         const material = new THREE.MeshBasicMaterial({
            map: loader.load(texture)
        })

        const paint = new THREE.Mesh(new THREE.PlaneGeometry(size[0],size[1]), material);
        paint.position.set(position[0],position[1],position[2]);
        paint.rotation.set(rotation[0],rotation[1],rotation[2]);
        this._mesh = paint;
        setTimeout(() => {
            App.scene.add(paint);
        }, 500);
    }


    public get mesh() {
        return this._mesh;
    }
}