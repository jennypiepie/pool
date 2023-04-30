import * as THREE from 'three';
import { App } from './app';
import imgSrc from '@/assets/textures/paintings/ff14.png';

export class Painting{
    private _mesh: THREE.Mesh;

    constructor() {
        const loader = new THREE.TextureLoader()

         const material = new THREE.MeshBasicMaterial({
            map: loader.load(imgSrc)
        })

        const paint = new THREE.Mesh(new THREE.PlaneGeometry(24, 16), material);
        paint.position.set(37, 15, 0);
        paint.rotation.set(0, -Math.PI / 2.55, 0);
        this._mesh = paint;
        setTimeout(() => {
            App.scene.add(paint);
        }, 500);
    }


    public get mesh() {
        return this._mesh;
    }
}