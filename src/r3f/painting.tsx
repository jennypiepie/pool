import { useTexture } from "@react-three/drei";
import { Texture } from "three";
import { useExhibitsStore } from "../store/useExhibitsStore";
import images from '@/assets/images'
import { useGlobalStore } from "../store/useGlobalStore";
import { useThree } from "@react-three/fiber";
import { IExhibits } from "./exhibits";

interface IPaintingProps {
    item: IExhibits;
}

function Painting(props: IPaintingProps) {
    const { name, size, position, rotation } = props.item;
    const texture = useTexture(images[name as keyof typeof images]) as Texture;
    const { sculpture } = useExhibitsStore();
    const { setCamera } = useGlobalStore();
    const { select } = useExhibitsStore();
    const { camera } = useThree();

    return (
        <mesh position={position}
            rotation={rotation}
            onClick={() => {
                if (!sculpture.hide) {
                    setCamera(camera.position.clone(), camera.rotation.clone());
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
