import * as THREE from 'three'
import { Camera } from './camera';
import { Controls } from './controls';
export class Renderer{
    private _renderer: THREE.WebGLRenderer;
    private _scene: THREE.Scene;
    private _camera: Camera;
    private _controls: Controls;
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, scene: THREE.Scene) {
        this._renderer = new THREE.WebGLRenderer({ canvas:canvas })
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.shadowMap.enabled = true;
		this._renderer.shadowMap.type = THREE.VSMShadowMap;
		this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this._canvas = canvas;
        this._scene = scene;
        this._camera = new Camera();
        this._controls = new Controls(this._camera.camera, canvas);
    }

    public get renderer() {
        return this._renderer;
    }

    public get controls() {
        return this._controls;
    }

    public get camera() {
        return this._camera;
    }

    public render() {
        this._renderer.render(this._scene, this._camera.camera);
    }

    public resize () {
        if (!this._canvas) { return; }

        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;

        const camera = this._camera.camera;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        this._renderer.setSize(width, height, false);
    }

}