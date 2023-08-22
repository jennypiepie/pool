import { useTexture } from "@react-three/drei";
import { Texture,Vector3Tuple } from "three";
import { useExhibitsStore } from "../store/useExhibitsStore";
import images from '@/assets/images'

interface IPaintingProps{
    name: string,
    size: number[],
    position: Vector3Tuple,
    rotation: Vector3Tuple,
    onClickPainting:()=>void,
}

function Painting(props: IPaintingProps) {
    const { name, size, position, rotation, onClickPainting } = props;
    const texture = useTexture(images[name as keyof typeof images]) as Texture;
    const { sculpture } = useExhibitsStore();

    return (
        <mesh position={position}
            rotation={rotation}
            onClick={onClickPainting}
            visible={!sculpture.hide}
        >
            <planeGeometry attach="geometry" args={[size[0], size[1]]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    );
}

export default Painting;
