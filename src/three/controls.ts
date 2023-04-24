import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export class Controls{
    private _controls: OrbitControls
    
    constructor(camera:THREE.PerspectiveCamera,canvas:HTMLCanvasElement) { 
        this._controls = new OrbitControls(camera, canvas);
        this._controls.update();
    }

    public get controls() {
        return this._controls
    }

}