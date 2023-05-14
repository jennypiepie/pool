import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';
import * as THREE from 'three';
// import { Physics } from "@react-three/rapier";
import { OrbitControls } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import Display from '../components/display';
import Npc from './npc';
import Exhibits from './exhibits';
import Loading from '../components/loading';
import Panel from '../components/panel';
import Lights from './lights';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { usePlayerStore } from '../store/usePlayerStore';


function Scene() {

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);
  const [photoSrc, setPhotoSrc] = useState('');
  const [shoot, setShoot] = useState(false);
  const { outfit } = useGlobalStore();
  const { player } = usePlayerStore();
  
  const getColliders = (colliders: Mesh[]) => {
    collidersRef.current = colliders;
  };

  const { display } = useExhibitsStore();

  const GetPhotos = () => {
    const { gl, scene, camera } = useThree();
    if (shoot) {
      gl.render(scene, camera);
      const imgData = gl.domElement.toDataURL("image/jpeg", 1.0);
      setPhotoSrc(imgData);
      setShoot(false);
    }
    return null;
  };

  const MoveCamera = () => {
    const { camera } = useThree();
    useFrame(() => {
      const distance = 20;
      const p1 = player.position;
      const rotateY = player.rotateY;
      const cameraPos = new Vector3(p1.x + distance * Math.sin(rotateY), p1.y+20, p1.z + distance * Math.cos(rotateY));
      camera.position.lerp(cameraPos, 0.05);
    });
    return null
  }
  
  return (<>
    <Suspense fallback={<Loading/>}>
      <Canvas
        gl={{
          pixelRatio: window.devicePixelRatio,
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        shadows={{ type: THREE.VSMShadowMap }}
        camera={{ fov: 45, far: 800, near: 0.1, position: [7, 24, 50], }}>
        <color attach="background" args={["#88ccee"]} />
        <fog attach="fog" color="#88ccee" near={1} far={600} />
            {/* <Physics debug> */}
        <Player controlsRef={controlsRef} collidersRef={collidersRef} />
        <Npc modelName='Prostitute.fbx'
          textureName='SimplePeople_Prostitute_White.png'
          position={[28, 0, -18]}
          rotateY={-1.23} />
        <Pool getColliders={getColliders} />
        <Exhibits />
              {/* </Physics> */}
        <OrbitControls 
                // minDistance={10} maxDistance={80}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2.1}
                // enablePan={false}
          ref={controlsRef}
        />
        <Lights />
        <GetPhotos />
        {outfit && <MoveCamera />}
      </Canvas >
      <Panel photoSrc={photoSrc} shoot={()=>setShoot(true)}/>
      {display.visible && <Display />}
    </Suspense>
  </>);
}

export default Scene;
