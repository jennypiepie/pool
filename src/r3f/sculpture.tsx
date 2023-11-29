import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import models from '../assets/models';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGlobalStore } from '../store/useGlobalStore';
import { ISculpture } from './exhibits';

interface ISculptureProps {
    item: ISculpture;
}

function Sculpture(props: ISculptureProps) {
    const { sculpture, clickSculpture } = useExhibitsStore();
    const { setCamera } = useGlobalStore();

    const { name, position, rotation, scale } = props.item;
    const model: GLTF = useGLTF(models[name as keyof typeof models]) as GLTF;
    const group = model.scene;
    const bBox = new THREE.Box3().setFromObject(model.scene);
    const center = new THREE.Vector3();
    bBox.getCenter(center);

    const modelRef = useRef();
    const positionY = position[1];
    const rotationY = rotation[1];
    const visible = !sculpture.hide || sculpture.name === name;

    useEffect(() => {
        if (!group) return
        group.traverse(function (child) {
            //@ts-ignore
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                //@ts-ignore
                child.material.opacity = 0.5;
            }
        });
    }, [group])

    useFrame((state) => {
        if (modelRef.current) {
            const t = state.clock.getElapsedTime();
            const mesh = modelRef.current as THREE.Mesh;
            // mesh.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
            // mesh.rotation.x = Math.cos(t / 4) / 8;
            mesh.rotation.y = Math.sin(t / 4) / 4 + rotationY;
            mesh.position.y = (1 + Math.sin(t / 1.5)) + positionY;
        }
    })

    const { camera } = useThree();
    const toDtails = () => {
        setCamera(camera.position.clone(), camera.rotation.clone());
        clickSculpture({ ...props.item, center: center });
    }

    return (
        <primitive object={group}
            position={position}
            rotation={rotation}
            scale={[scale, scale, scale]}
            ref={modelRef}
            onClick={toDtails}
            visible={visible}
        />
    )
}

export default Sculpture;
