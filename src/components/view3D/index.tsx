import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import './index.scss'
import texture from '@/assets/textures/SimplePeople_BeachBabe_White.png' 

const View3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const clock = new THREE.Clock();

    useEffect(() => {

        if (canvasRef.current === null) { return; }

        //renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.VSMShadowMap;
		renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
      
        //scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x88ccee);
        // scene.fog = new THREE.Fog(0x88ccee, 0, 50);

        //camera
        const camera = new THREE.PerspectiveCamera(45, 2, 1, 800);
        camera.position.set(5, 15, 50);

        //control
        const control = new OrbitControls(camera, canvasRef.current);
        control.update();

        //loader
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(require('@/assets/model/pool.glb'), (gltf) => {
            gltf.scene.position.set(0, 13.5, 0);
            gltf.scene.scale.set(8, 8, 8);
            scene.add(gltf.scene);
        });
        
        const texLoader = new THREE.TextureLoader();
        const tex = texLoader.load(texture);

        let mixer: THREE.AnimationMixer
        const fbxLoader = new FBXLoader();
        fbxLoader.load(require('@/assets/model/BeachBabe.fbx'), (fbx) => {
            if (!fbx) return;
            fbx.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    // @ts-ignore
                    mesh.material.map = tex;
                }
            });
            fbx.scale.set(0.05, 0.05, 0.05);

            mixer = new THREE.AnimationMixer(fbx)
            gltfLoader.load(require('@/assets/model/animations/Idle.glb'), (gltf) => {
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
                render();
            });
            scene.add(fbx);
        });
        
        //light
        const fillLight1 = new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5);
        fillLight1.position.set(2, 1, 1);
        scene.add(fillLight1);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(- 5, 25, - 1);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.near = 0.01;
		directionalLight.shadow.camera.far = 500;
		directionalLight.shadow.camera.right = 30;
		directionalLight.shadow.camera.left = - 30;
		directionalLight.shadow.camera.top	= 30;
		directionalLight.shadow.camera.bottom = - 30;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		directionalLight.shadow.radius = 4;
		directionalLight.shadow.bias = - 0.00006;
        scene.add(directionalLight);
        
        const geometry = new THREE.PlaneGeometry( 3, 3 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(10, 0, -3.8);
        scene.add(plane)
        
        const axesHelper = new THREE.AxesHelper( 20 );
        scene.add( axesHelper );

        const render = () => {
            const delta = clock.getDelta();
            mixer && mixer.update(delta);
            renderer.render(scene, camera);
            window.requestAnimationFrame(render);
        };

        window.requestAnimationFrame(render);

        const handleResize = () => {
            if (canvasRef.current === null) { return; }

            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <canvas ref={canvasRef} className='full-screen' />
    )
}

export default View3D