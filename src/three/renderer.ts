import * as THREE from 'three'

export class Renderer{
    private _renderer: THREE.WebGLRenderer;
    private _scene: THREE.Scene;
    public _camera: THREE.PerspectiveCamera;

    constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        this._scene = scene;
        this._camera = camera;
        this._renderer = new THREE.WebGLRenderer({ canvas:canvas })
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.shadowMap.enabled = true;
		this._renderer.shadowMap.type = THREE.VSMShadowMap;
		this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }

    public render() {
        this._renderer.render(this._scene, this._camera);
    }

    // public render = () => {
    //     const clock = new THREE.Clock();
    //     const delta = clock.getDelta();
    //     // mixer && mixer.update(delta);
    //     renderer.render(sceneRef.current!, currentCameraRef.current!);
    //     window.requestAnimationFrame(render);
    //  };
}