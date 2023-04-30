import * as THREE from 'three'
import { Light } from './light';
import { Painting } from './painting';
import { Player } from './player';
import { Pool } from './pool';

export class Scene{
    private _scene: THREE.Scene;
    private _lights: Light;
    private _player: Player;
    private _pool: Pool;
    private _paint: Painting;

    constructor() { 
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0x88ccee);
        this._scene.fog = new THREE.Fog(0x88ccee, 0, 600);
        this._lights = new Light();
        this._lights.allLights.forEach((light) => {
            this._scene.add(light);
        })
        this._player = new Player();
        this._pool = new Pool();
        this._paint = new Painting();
    }

    public get scene() {
        return this._scene;
    }

    public get player() {
        return this._player;
    }

    public get pool() {
        return this._pool;
    }

    public get paint() {
        return this._paint;
    }

    public add(obj: any) {
        if (obj instanceof THREE.Object3D) {
            this._scene.add(obj);
        }
    }
}