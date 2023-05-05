import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { App } from './app';

export class Pool{
    constructor() { 
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(require('@/assets/model/pool.glb'), (gltf) => {
            const group = gltf.scene;
            group.position.set(0, 13.5, 0);
            group.scale.set(8, 8, 8);
            group.traverse((child: any) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    App.scene.colliders.push(mesh);
                }
            })
            App.scene.add(group);
        });
    }

}