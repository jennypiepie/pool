import { useTexture } from "@react-three/drei";
import { Texture } from "three";
import { useExhibitsStore } from "../store/useExhibitsStore";
import images from '@/assets/images';
import { IExhibits } from "./exhibits";

interface IPaintingProps {
    item: IExhibits;
}

function Painting(props: IPaintingProps) {
    const { name, size, position, rotation } = props.item;
    const texture = useTexture(images[name]) as Texture;
    const { sculpture, select } = useExhibitsStore();
    return (
        <mesh position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                if (!sculpture.hide) {
                    select(props.item);
                }
            }}
            visible={!sculpture.hide}
        >
            <planeGeometry attach="geometry" args={[size[0], size[1]]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    );
}

export default Painting;
