import * as THREE from 'three'
import { Light } from './light';
import { Painting } from './painting';
import { Player } from './player';
import { Pool } from './pool';
import { Sculpture } from './sculpture';

import imgSrc from '@/assets/textures/paintings/ff14.png';

export class Scene{
    private _scene: THREE.Scene;
    private _lights: Light;
    private _player: Player;
    private _pool: Pool;
    public colliders: THREE.Mesh[] = [];

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
        new Painting(imgSrc,[24, 16],[37, 15, 0],[0, -Math.PI / 2.55, 0]);
        new Sculpture('Lucy100k.ply', [-85, 18, -20], [0, Math.PI, 0], 0.024);
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

    public add(obj: any) {
        if (obj instanceof THREE.Object3D) {
            this._scene.add(obj);
        }
    }
}