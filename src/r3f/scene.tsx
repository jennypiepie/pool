import { useRef, Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';
import * as THREE from 'three';
// import { Physics } from "@react-three/rapier";
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import Display from '../components/display';
import Npc from './npc';
import Exhibits from './exhibits';
import Loading from '../components/loading';
import Panel from '../components/panel';
import Lights from './lights';


function Scene() {

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);
  const [visible, setVisible] = useState(false);
  const [painting, setPainting] = useState('');
  const [photoSrc, setPhotoSrc] = useState('');
  const [shoot, setShoot] = useState(false);

  
  const getColliders = (colliders: Mesh[]) => {
    collidersRef.current = colliders;
  };

  const onOpen = (name:string) => {
    setVisible(true);
    setPainting(name);
  }

  const onClose = () => {
    setVisible(false);
  }

  const GetRenderer = () =>{
    const { gl, scene, camera } = useThree();
    if (shoot) {
      gl.render(scene, camera);
      const imgData = gl.domElement.toDataURL("image/jpeg", 1.0);
      setPhotoSrc(imgData);
      setShoot(false);
    }
    return null;
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
        <Exhibits onOpen={onOpen} />
        
              {/* </Physics> */}
        <OrbitControls 
                // minDistance={10} maxDistance={80}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2.1}
                // enablePan={false}
          ref={controlsRef}
        />
        <Lights />
        <GetRenderer />
      </Canvas >
      <Panel photoSrc={photoSrc} shoot={()=>setShoot(true)}/>
      {visible && <Display painting={painting} onClose={onClose} />}
    </Suspense>
  </>);
}

export default Scene;
