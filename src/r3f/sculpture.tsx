import { useLoader } from '@react-three/fiber';
import { BufferGeometry,Vector3Tuple } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
// import { RigidBody } from "@react-three/rapier";

interface ISculptureProps {
    name: string,
    position: Vector3Tuple,
    rotation: Vector3Tuple,
    scale:number,
}

function Sculpture(props:ISculptureProps) {
    const { name, position, rotation, scale } = props;
    const ply = useLoader(
        PLYLoader,
        require(`@/assets/model/${name}`),
    ) as BufferGeometry;
    ply.scale(scale,scale,scale);
    ply.computeVertexNormals();

    return (
        // <RigidBody>
            <mesh position={position}
                rotation={rotation}
                castShadow
                receiveShadow
            >
                <bufferGeometry attach="geometry" {...ply} />
                <meshLambertMaterial attach="material" />
            </mesh>
        // </RigidBody>
        
    )
}

export default Sculpture;
