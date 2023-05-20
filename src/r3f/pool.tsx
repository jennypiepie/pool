import { useGLTF } from '@react-three/drei';
// import { RigidBody } from "@react-three/rapier";
import { Mesh } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
interface IPoolProps{
    getColliders: (colliders:Mesh[]) => void;
}

function Pool(props: IPoolProps) {
    const colliders: Mesh[] = [];
    const gltf = useGLTF(require('@/assets/model/pool.glb'));
    const { sculpture } = useExhibitsStore();

    //@ts-ignore
    const group = gltf.scene;
    group.position.set(0, 14, 0);
    group.scale.set(8, 8, 8);
    group.traverse((child: any) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            colliders.push(mesh);
        }
    });
    props.getColliders(colliders);

    return (
        // <RigidBody colliders='trimesh' type='fixed'>
        <primitive object={group} visible={!sculpture.hide} />
        // </RigidBody>
    );
}

export default Pool;
