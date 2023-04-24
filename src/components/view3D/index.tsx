import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'
import { App } from '@/src/three/app'
// import { useInput } from '@/src/hooks/useInput'

// type Key = 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD' | 'ShiftLeft' | 'Space';


const View3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const clock = new THREE.Clock();
    // const [action, setAction] = useState('Idle');
    // const keys = {
    //     KeyW: 'Walking',
    //     KeyS: 'Backwards',
    //     KeyA: 'Left',
    //     KeyD: 'Right',
    //     ShiftLeft: 'Running',
    //     Space: 'Jumping',
    // }

    useEffect(() => {
        if (canvasRef.current === null) { return; }

        new App(canvasRef.current);

        const axesHelper = new THREE.AxesHelper( 20 );
        App.scene.add( axesHelper );

        const render = () => {
            const delta = clock.getDelta();
            App.player.mixer && App.player.mixer.update(delta);
            App.renderer.render();
            window.requestAnimationFrame(render);
        };

        window.requestAnimationFrame(render);

        // const handleKeyDown = (e: any) => {
        //     const key = e.code as Key;
        //     keys[key] ? setAction(keys[key]) : setAction('Idle');
        // }
        // const handleKeyUp = (e: any) => {
        //     if (e.code === 'Space') {
        //         setTimeout(() => setAction('Idle'), 1000);
        //     } else {
        //         setAction('Idle');
        //     }

        // }
        // window.addEventListener('keydown', handleKeyDown);
        // window.addEventListener('keyup', handleKeyUp);

        // const handleResize = () => {
        //     if (canvasRef.current === null) { return; }

        //     const width = canvasRef.current.clientWidth;
        //     const height = canvasRef.current.clientHeight;

        //     camera.aspect = width / height;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(width, height, false);
        // }
        // handleResize();
        // window.addEventListener('resize', handleResize);

        return () => {
            // window.removeEventListener('resize', handleResize);
            // window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('keyup', handleKeyUp);
        }
    }, [])


    return (
        <canvas ref={canvasRef} className='full-screen' />
    )
}

export default View3D