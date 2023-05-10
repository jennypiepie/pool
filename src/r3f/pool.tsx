import {useGLTF} from '@react-three/drei';

function Pool() {
    const gltf = useGLTF(require('@/assets/model/pool.glb'));

    //@ts-ignore
    const group = gltf.scene;
    group.position.set(0, 13.5, 0);
    group.scale.set(8, 8, 8);
    group.traverse((child: any) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }
    })

    return (
        //@ts-ignore
        <primitive object={group}/>
    );
}

export default Pool;
