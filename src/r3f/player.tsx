import { useFrame, useThree } from '@react-three/fiber';
import { useTexture,useFBX,useGLTF} from '@react-three/drei';
import { useEffect,useRef } from 'react'; 
import { AnimationMixer, Vector3, Raycaster, Mesh} from 'three';
import { useInput } from '../hooks/useInput';
import texSrc from '@/assets/textures/SimplePeople_BeachBabe_White.png';
import modelSrc from '@/assets/model/BeachBabe.fbx';
// import { RigidBody } from "@react-three/rapier";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface IPlayerProps{
    controlsRef: React.MutableRefObject<OrbitControls | null>;
    collidersRef: React.MutableRefObject<Mesh[] | null>;
}

function Player(props: IPlayerProps) {
    const action = useInput();

    const camera = useThree((state) => state.camera);
    const meshRef = useRef<THREE.Mesh>(null);

    const currentAction = useRef('Idle');

    const texture = useTexture(texSrc);
    const fbx = useFBX(modelSrc);
    fbx.scale.set(0.05, 0.05, 0.05);
    
    const anims = ['Walking', 'Backwards', 'Left', 'Right', 'Running', 'Jumping','Idle']
    const postures = useGLTF(anims.map((anim) =>require(`@/assets/model/animations/${anim}.glb`)))

    const mixer = new AnimationMixer(fbx)
    const actions = {
        'Walking': mixer.clipAction(postures[0].animations[0]),
        'Backwards': mixer.clipAction(postures[1].animations[0]),
        'Left': mixer.clipAction(postures[2].animations[0]),
        'Right': mixer.clipAction(postures[3].animations[0]),
        'Running': mixer.clipAction(postures[4].animations[0]),
        'Jumping':mixer.clipAction(postures[5].animations[0]),
        'Idle': mixer.clipAction(postures[6].animations[0]),
    }
    //@ts-ignore
    actions[action].play()

    function move(action: string,dt: number) {
        const p1 = meshRef!.current!.position
        const p2 = camera.position
        const v1 = p1.clone().sub(p2)
        v1.y = 0
        const v2 = new Vector3(v1.z, 0, -v1.x)
        let dir = v1
        let step = 3
        let blocked = false
        let vy = 0;
        const gravity = 20;

        switch (action) {
            case 'Walking':
                dir = v1.normalize()
                break
            case 'Backwards':
                dir = v1.negate().normalize()
                step = 2
                break
            case 'Left':
                dir = v2.normalize()
                break
            case 'Right':
                dir = v2.negate().normalize()
                break
            case 'Running':
                dir = v1.normalize()
                step = 10
                break
            default:
                return
        }
        // console.log(dir);

        //水平方向碰撞检测
        const rayOrigin = p1.clone()
        rayOrigin.y += 5;
        const raycaster = new Raycaster()
        raycaster.set(rayOrigin, dir)
        const intersects = raycaster.intersectObjects(props.collidersRef.current!);

        // console.log(intersects);

        if (intersects.length > 0) {
            if(intersects[0].distance < 5) blocked = true
        }
        
        //垂直方向碰撞检测
        const dir2 = new Vector3(0, -1, 0)
        const rayOrigin2 = p1.clone()
        rayOrigin2.y += 10;
        const raycaster2 = new Raycaster()
        raycaster2.set(rayOrigin2, dir2)
        const intersects2 = raycaster2.intersectObjects(props.collidersRef.current!);
        // console.log(intersects2);
        const targetY = rayOrigin2.y - intersects2[0].distance
        if (targetY > p1.y) {
            p1.y = 0.8 * p1.y + 0.2 * targetY
            vy = 0;
        } else {
            vy += dt * gravity;
			p1.y -= vy;
            if (p1.y < targetY) {
                vy = 0;
                p1.y = targetY
            }
        }


        rotateModel()
        if (!blocked) {
            p1.x += dir.x * step * 0.1;
            p2.x += dir.x * step * 0.1;
            p1.z += dir.z * step * 0.1;
            p2.z += dir.z * step * 0.1;
            //@ts-ignore
            props.controlsRef.current.target.set(...p1);
        }

    }

    function rotateModel() {
        // 获取人物中心点和相机中心点
        //@ts-ignore
        const p1 = meshRef.current.position
        const p2 = camera.position
        // 计算两者连接形成的向量
        const v1 = p1.clone().sub(p2)
        v1.y = 0
        v1.normalize()
        // 人物的初始面向
        const origin = new Vector3(0,0,1)
        // 点乘求夹角
        const radian = Math.acos(v1.dot( origin ))
        // 叉乘求方向
        v1.cross(origin)
        //@ts-ignore
        meshRef.current.rotation.y = radian * (v1.z === 0 && 1 / v1.z < 0 ? -1 : 1)
    }


    useFrame((_, delta) => {
        mixer?.update(delta)
        move(action,delta)
    })

    useEffect(() => {
        if (!fbx) return
        fbx.traverse(function (child) {
            //@ts-ignore
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                //@ts-ignore
                child.material.map = texture
            }
        });
    }, [])


    useEffect(() => {
        if (currentAction.current !== action) {
            //@ts-ignore
            const nextAction = actions[action]
            //@ts-ignore
            const current = actions[currentAction.current]
            current?.fadeOut(0.3)
            nextAction?.reset().fadeIn(0.3).play()
            currentAction.current = action
        }
    },[action])

    return (
        // <RigidBody>
            <mesh ref={meshRef} position={[0,0,0]}>
                <primitive object={fbx}/>
            </mesh>
        // </RigidBody>
    );
}

export default Player;