import { useFrame } from '@react-three/fiber';
import { useTexture,useFBX,useGLTF} from '@react-three/drei';
import { useEffect,useRef } from 'react'; 
import { AnimationMixer,Vector3Tuple} from 'three';
// import { RigidBody } from "@react-three/rapier";

interface IProps{
    modelName: string;
    textureName: string;
    position: Vector3Tuple;
    rotateY: number;
}

function Npc(props: IProps) {
    const { modelName, textureName, position, rotateY} = props;
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(require(`@/assets/textures/${textureName}`));
    const fbx = useFBX(require(`@/assets/model/${modelName}`));
    fbx.scale.set(0.05, 0.05, 0.05);
    
    const anims = ['Idle'];
    const postures = useGLTF(anims.map((anim) => require(`@/assets/model/animations/${anim}.glb`)));

    const mixer = new AnimationMixer(fbx);
    const actions = {
        'Idle': mixer.clipAction(postures[0].animations[0]),
    };
    //@ts-ignore
    actions['Idle'].play();

    useFrame((_, delta) => {
        mixer?.update(delta);
    });

    useEffect(() => {
        if (!fbx) return
        fbx.traverse(function (child) {
            //@ts-ignore
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                //@ts-ignore
                child.material.map = texture;
            }
        });
    }, [])

    return (
        // <RigidBody>
            <mesh ref={meshRef} position={position} rotation={[0,rotateY,0]}>
                <primitive object={fbx}/>
            </mesh>
        // </RigidBody>
    );
}

export default Npc;