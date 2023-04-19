import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import './index.scss'

const View3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {

        if (canvasRef.current === null) { return }

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
      renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.VSMShadowMap;
			renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100)
        camera.position.set(10, 0, 10)


        const control = new OrbitControls(camera, canvasRef.current)
        control.update()

        const loader = new GLTFLoader()
        loader.load(require('@/assets/model/pool.glb'), (gltf) => {
            scene.add(gltf.scene)
        })
      
      
			scene.background = new THREE.Color( 0x88ccee );
      scene.fog = new THREE.Fog(0x88ccee, 0, 50);
      
      const fillLight1 = new THREE.HemisphereLight( 0x4488bb, 0x002244, 0.5 );
			fillLight1.position.set( 2, 1, 1 );
			scene.add( fillLight1 );

			const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
			directionalLight.position.set( - 5, 25, - 1 );
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
			scene.add( directionalLight );

        const render = () => {
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

        const handleResize = () => {
            if (canvasRef.current === null) { return }

            const width = canvasRef.current.clientWidth
            const height = canvasRef.current.clientHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className='full-screen' />
    )
}

export default View3D