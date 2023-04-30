import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export class Controls{
    private _controls: OrbitControls
    
    constructor(camera:THREE.PerspectiveCamera,canvas:HTMLCanvasElement) { 
        this._controls = new OrbitControls(camera, canvas);
        this._controls.minDistance = 10;
        this._controls.maxDistance = 80;
        this._controls.minPolarAngle = 0;
        this._controls.maxPolarAngle = Math.PI / 2.1;
        // this._controls.enablePan = false;
        this._controls.update();
    }

    public get controls() {
        return this._controls
    }

}