import * as THREE from 'three'

export class Scene{
    private _scene: THREE.Scene;

    constructor() { 
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0x88ccee);
        this._scene.fog = new THREE.Fog(0x88ccee, 0, 600);
    }

    public get scene() {
        return this._scene;
    }

    public add(obj: any) {
        if (obj instanceof THREE.Object3D) {
            this._scene.add(obj);
        }
    }
}