import { useTexture } from "@react-three/drei";
import { Texture,Vector3Tuple } from "three";
import { useExhibitsStore } from "../store/useExhibitsStore";

interface IPaintingProps{
    name: string,
    size: number[],
    position: Vector3Tuple,
    rotation: Vector3Tuple,
    onClickPainting:()=>void,
}

function Painting(props: IPaintingProps) {
    const { name, size, position, rotation, onClickPainting} = props;
    const texture = useTexture(require(`@/assets/textures/paintings/${name}`)) as Texture;
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
