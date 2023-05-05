import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { App } from './app';

export class Player{

    private _group: THREE.Group | null = null;
    private _mixer: THREE.AnimationMixer | null = null;
    private _position: THREE.Vector3 = new THREE.Vector3();
    private _rotation: THREE.Vector3 = new THREE.Vector3();
    private _actionMap = new Map();
    // private _currentAction = 'Idle';

    constructor() {
        const fbxLoader = new FBXLoader();
        // const gltfLoader = new GLTFLoader();
        const texLoader = new THREE.TextureLoader();

        const tex = texLoader.load(require('@/assets/textures/SimplePeople_BeachBabe_White.png'));
        fbxLoader.load(require('@/assets/model/BeachBabe.fbx'), (fbx) => {
            if (!fbx) return;
            this._group = fbx;
            fbx.traverse( (child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    // @ts-ignore
                    mesh.material.map = tex;
                }
            });
            fbx.scale.set(0.05, 0.05, 0.05);
            this._position = fbx.position.clone();
            App.scene.add(fbx);

            this._mixer = new THREE.AnimationMixer(fbx);
            const anims = ['Walking', 'Backwards', 'Left', 'Right', 'Running', 'Jumping', 'Idle'];
            const gltfLoader = new GLTFLoader();
            anims.forEach((anim) => {
                gltfLoader.load(require(`@/assets/model/animations/${anim}.glb`), (gltf) => {
                    this._actionMap.set(anim, this._mixer?.clipAction(gltf.animations[0]));
                });
            });

            setTimeout(() => {
                this.animate('Idle');
            }, 500); 
        });
    }

    public get group() {
        return this._group;
    }

    public get mixer() {
        return this._mixer;
    }

    public animate(curAction: string = 'Idle', preAction: string = 'Idle') {
        this._actionMap.get(preAction)?.fadeOut(0.3);
        this._actionMap.get(curAction)?.reset().fadeIn(0.3).play();
        App.renderer.render();
    };

    public move(action: string) {
        if (!this._group) {
            return;
        }

        // this._currentAction = action;
        const camera = App.renderer.camera.camera

        const p1 = this._position;
        const p2 = camera.position;
        const v1 = p1.clone().sub(p2);
        v1.y = 0;
        const v2 = new THREE.Vector3(v1.z, 0, -v1.x);
        let dir = v1;
        let step = 3;
        let blocked = false;
        // const initY = -20

        switch (action) {
            case 'Walking':
                dir = v1.normalize();
                break;
            case 'Backwards':
                dir = v1.negate().normalize();
                step = 2;
                break;
            case 'Left':
                dir = v2.normalize();
                break;
            case 'Right':
                dir = v2.negate().normalize();
                break;
            case 'Running':
                dir = v1.normalize();
                step = 10;
                break;
            default:
                this._group.position.set(p1.x, p1.y, p1.z);
                this._group.rotation.y = this._rotation.y;
                return;
        }

        const rayOrigin = p1.clone();
        rayOrigin.y += 3;
        const raycaster = new THREE.Raycaster();
        raycaster.set(rayOrigin, dir);
        const intersects = raycaster.intersectObjects(App.scene.colliders);

        if (intersects.length > 0) {
            if (intersects[0].distance < 2) blocked = true;
        }
        
        const dir2 = new THREE.Vector3(0, -1, 0);
        const rayOrigin2 = p1.clone();
        rayOrigin2.y += 10;
        const raycaster2 = new THREE.Raycaster();
        raycaster2.set(rayOrigin2, dir2);
        const intersects2 = raycaster2.intersectObjects(App.scene.colliders);
        if (!intersects2[0]) {
            return;
        }
        const targetY = rayOrigin2.y - intersects2[0].distance;
        if (targetY > p1.y) {
            // p1.y = targetY
            p1.y = 0.8 * p1.y + 0.2 * targetY;
        } else {
            p1.y -= 9;
            if (p1.y < targetY) {
                p1.y = targetY;
            }
        }

        // const rotateModel = ( player: THREE.Group, camera: THREE.PerspectiveCamera) => {
        //     if (!player || !camera) {
        //         return;
        //     }
        //     // 获取人物中心点和相机中心点
        //     const p1 = player.position;
        //     const p2 = camera.position;
        //     // 计算两者连接形成的向量
        //     const v1 = p1.clone().sub(p2);
        //     v1.y = 0;
        //     v1.normalize();
        //     // 人物的初始面向
        //     const origin = new THREE.Vector3(0, 0, 1);
        //     // 点乘求夹角
        //     const radian = Math.acos(v1.dot(origin));
        //     // 叉乘求方向
        //     v1.cross(origin);

        //     this._rotation.y = radian * (v1.z === 0 && 1 / v1.z < 0 ? -1 : 1);
        //     player.rotation.y = this._rotation.y;
        // }

        // rotateModel(this._group, camera);
        if (!blocked) {
            p1.x += dir.x * step * 0.1;
            p2.x += dir.x * step * 0.1;
            p1.z += dir.z * step * 0.1;
            p2.z += dir.z * step * 0.1;
            this._group.position.set(p1.x, p1.y, p1.z);
            App.renderer.controls.controls.target.set(p1.x, p1.y, p1.z);
        }
    }

}