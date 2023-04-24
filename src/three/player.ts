import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { App } from './app';

export class Player{

    private _group: THREE.Group | null = null;
    private _mixer: THREE.AnimationMixer | null = null;

    constructor() {
        const fbxLoader = new FBXLoader();
        const gltfLoader = new GLTFLoader();
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
            App.scene.add(fbx);

            this._mixer = new THREE.AnimationMixer(fbx);
            gltfLoader.load(require('@/assets/model/animations/Idle.glb'), (gltf) => {
                const action = this._mixer!.clipAction(gltf.animations[0]);
                action.play();
                App.renderer.render();
            });
        });
    }

    public get group() {
        return this._group;
    }

    public get mixer() {
        return this._mixer;
    }

    public move() {
        
    }

    
    // const move = (action: string, player: THREE.Group, currentCamera: THREE.PerspectiveCamera,
    //     colliders: THREE.Group[], currentControl: OrbitControls) => {
    //     if (!player || !currentCamera || !currentControl) {
    //         return
    //     }
    //     const p1 = player.position
    //     const p2 = currentCamera.position
    //     const v1 = p1.clone().sub(p2)
    //     v1.y = 0
    //     const v2 = new THREE.Vector3(v1.z, 0, -v1.x)
    //     let dir = v1
    //     let step = 3
    //     let blocked = false
    //     // const initY = -20
        
    //     // if (action === 'Jumping') {
    //     //     if (up) {
    //     //         p1.y += 4
    //     //     } else {
    //     //         p1.y -= 4
    //     //         if (p1.y < initY) {
    //     //             p1.y = initY
    //     //         }
    //     //     }
    //     //     if (p1.y > 100) {
    //     //         up = false
    //     //     }
    //     //     controlsRef.current.target.set( ...p1 )
    //     // }

    //     switch (action) {
    //         case 'Walking':
    //             dir = v1.normalize()
    //             break
    //         case 'Backwards':
    //             dir = v1.negate().normalize()
    //             step = 2
    //             break
    //         case 'Left':
    //             dir = v2.normalize()
    //             break
    //         case 'Right':
    //             dir = v2.negate().normalize()
    //             break
    //         case 'Running':
    //             dir = v1.normalize()
    //             step = 10
    //             break
    //         default:
    //             return
    //     }
    //     // console.log(dir);

    //     const rayOrigin = p1.clone()
    //     rayOrigin.y += 60
    //     const raycaster = new THREE.Raycaster()
    //     raycaster.set(rayOrigin, dir)
    //     const intersects = raycaster.intersectObjects(colliders)
    //     // console.log(intersects);

    //     if (intersects.length > 0) {
    //         if(intersects[0].distance < 50) blocked = true
    //     }
        
    //     const dir2 = new THREE.Vector3(0, -1, 0)
    //     const rayOrigin2 = p1.clone()
    //     rayOrigin2.y += 200
    //     const raycaster2 = new THREE.Raycaster()
    //     raycaster2.set(rayOrigin2, dir2)
    //     const intersects2 = raycaster2.intersectObjects(colliders)
    //     // console.log(intersects2);
    //     if (!intersects2[0]) {
    //         return;
    //     }
    //     const targetY = rayOrigin2.y - intersects2[0].distance
    //     if (targetY > p1.y) {
    //         // p1.y = targetY
    //         p1.y = 0.8 * p1.y + 0.2 * targetY
    //     } else {
    //         p1.y -= 9
    //         if (p1.y < targetY) {
    //             p1.y = targetY
    //         }
    //     }


    //     rotateModel(player, currentCamera);
    //     if (!blocked) {
    //         p1.x += dir.x * step
    //         p2.x += dir.x * step
    //         p1.z += dir.z * step
    //         p2.z += dir.z * step
    //         currentControl.target.set(p1.x, p1.y, p1.z);
    //     }

    // }

    // const rotateModel = ( player: THREE.Group, currentCamera: THREE.PerspectiveCamera,) => {
    //     if (!player || !currentCamera) {
    //         return;
    //     }
    //     // 获取人物中心点和相机中心点
    //     const p1 = player.position
    //     const p2 = currentCamera.position
    //     // 计算两者连接形成的向量
    //     const v1 = p1.clone().sub(p2)
    //     v1.y = 0
    //     v1.normalize()
    //     // 人物的初始面向
    //     const origin = new THREE.Vector3(0,0,1)
    //     // 点乘求夹角
    //     const radian = Math.acos(v1.dot( origin ))
    //     // 叉乘求方向
    //     v1.cross(origin)
    //     player.rotation.y = radian * (v1.z === 0 && 1 / v1.z < 0 ? -1 : 1)
    // }

}