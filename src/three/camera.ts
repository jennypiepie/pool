import * as THREE from 'three'

export class Camera {
    private _camera: THREE.PerspectiveCamera;

    constructor() { 
        this._camera = new THREE.PerspectiveCamera(45, 2, 1, 800);
        this._camera.position.set(5, 15, 50);
    }

    public get camera() {
        return this._camera;
    }
}