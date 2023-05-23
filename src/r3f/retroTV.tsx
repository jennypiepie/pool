import { useFBX } from '@react-three/drei';
// import { useExhibitsStore } from '../store/useExhibitsStore';
import { useVideoTexture } from '@react-three/drei'

function RetroTV() {
    // const { sculpture } = useExhibitsStore();
    const fbx = useFBX(require('@/assets/model/tv.fbx'));
    fbx.scale.set(0.05, 0.05, 0.05);

    function VideoMaterial() {
        const texture = useVideoTexture(require("@/assets/video/medusa.mp4"), {
            unsuspend: 'canplay',
            crossOrigin: 'Anonymous',
            muted: true,
            loop: true,
            start: false
        });
        return <meshBasicMaterial map={texture} toneMapped={false} />
    }

    return (
        <group>
            {/* <primitive object={fbx}
                position={[-70,24,100]}
                rotation={[0,-Math.PI/2,0]}
                visible={!sculpture.hide}
                scale={[2,2,2]}
            /> */}
            <mesh
                position={[-80, 24, 100]}
                rotation={[0,-Math.PI/2,0]}
            >
                <planeGeometry args={[20,15]}/>
                <VideoMaterial />
            </mesh>
        </group>
    )
}

export default RetroTV;