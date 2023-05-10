import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'
import { App } from '@/src/three/app'
import { useInput } from '@/src/hooks/useInput'
import { useBGM } from '@/src/hooks/useBGM'

const View3D: React.FC = () => {
    useBGM();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const AppRef = useRef<App | null>(null);
    const clock = new THREE.Clock();
    const actionRef = useRef<string>('Idle');
    const act = useInput();

    useEffect(() => {
        if (canvasRef.current === null) { return; }

        AppRef.current = new App(canvasRef.current);

        const axesHelper = new THREE.AxesHelper(20);
        App.scene.add(axesHelper);

        const render = () => {
            const delta = clock.getDelta();
            App.scene.player.mixer && App.scene.player.mixer.update(delta);
            App.scene.player.move(actionRef.current);
            App.renderer.render();
            window.requestAnimationFrame(()=>render());
        };

        window.requestAnimationFrame(()=>render());

        App.renderer.resize();
        window.addEventListener('resize', App.renderer.resize);

        return () => {
            window.removeEventListener('resize', App.renderer.resize);
        }
    }, []);

    useEffect(() => {

         if (actionRef.current !== act) {
            App.scene.player.animate(act,actionRef.current);
            actionRef.current = act
        }
    },[act])

    return (
        <canvas ref={canvasRef} className='full-screen' />
    )
}

export default View3D