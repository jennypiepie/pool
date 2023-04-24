import * as THREE from 'three'

export class Light{
    private _fillLight: THREE.HemisphereLight;
    private _directionalLight: THREE.DirectionalLight;

    public allLights:any[] = [];

    constructor() {
        this._fillLight = new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5);
        this._fillLight.position.set(2, 1, 1);

        this._directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this._directionalLight.position.set(- 5, 25, - 1);
		this._directionalLight.castShadow = true;
		this._directionalLight.shadow.camera.near = 0.01;
		this._directionalLight.shadow.camera.far = 500;
		this._directionalLight.shadow.camera.right = 30;
		this._directionalLight.shadow.camera.left = - 30;
		this._directionalLight.shadow.camera.top	= 30;
		this._directionalLight.shadow.camera.bottom = - 30;
		this._directionalLight.shadow.mapSize.width = 1024;
		this._directionalLight.shadow.mapSize.height = 1024;
		this._directionalLight.shadow.radius = 4;
        this._directionalLight.shadow.bias = - 0.00006;
        
        this.allLights.push(this._fillLight,this._directionalLight)
    }
}