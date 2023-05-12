import { useTexture } from "@react-three/drei";
import { Texture } from "three";

interface IPaintingProps{
    name: string,
    size: number[],
    position: number[],
    rotation: number[],
    onClickPainting:()=>void,
}

function Painting(props: IPaintingProps) {
    const { name, size, position, rotation, onClickPainting} = props;
    const texture = useTexture(require(`@/assets/textures/paintings/${name}`)) as Texture;

    return (
        <mesh position={[position[0], position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
            onClick={onClickPainting}
        >
            <planeGeometry attach="geometry" args={[size[0], size[1]]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    );
}

export default Painting;
