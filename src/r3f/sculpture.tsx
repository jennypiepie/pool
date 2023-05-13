import { useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3Tuple, Mesh} from 'three';

interface ISculptureProps {
    name: string,
    position: Vector3Tuple,
    rotation: Vector3Tuple,
    scale:number,
}

function Sculpture(props:ISculptureProps) {
    const { name, position, rotation, scale } = props;
    const model = useFBX(require(`@/assets/model/exhibits/${name}`));
    const modelRef = useRef();
    const positionY = position[1];
    const rotationY = rotation[1];

    useFrame((state) => {
    if (modelRef.current) {
        const t = state.clock.getElapsedTime();
        const mesh = modelRef.current as Mesh;
        // mesh.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        // mesh.rotation.x = Math.cos(t / 4) / 8;
        mesh.rotation.y = Math.sin(t / 4) / 4 + rotationY;
        mesh.position.y = (1 + Math.sin(t / 1.5)) + positionY;
    }
  })
    return (
        <primitive object={model}
            position={position}
            rotation={rotation}
            scale={[scale, scale, scale]}
            ref={modelRef}
        />
        
    )
}

export default Sculpture;
