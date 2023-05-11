import { useLoader } from '@react-three/fiber';
import { BufferGeometry } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
// import { RigidBody } from "@react-three/rapier";

interface ISculptureProps {
    name: string,
    position: number[],
    rotation: number[],
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
            <mesh position={[position[0], position[1], position[2]]}
                rotation={[rotation[0], rotation[1], rotation[2]]}
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
