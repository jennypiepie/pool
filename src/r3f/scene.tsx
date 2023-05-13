import { useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';
import Sculpture from './sculpture';
import Painting from './painting';
// import { useBGM } from '../hooks/useBGM';
import * as THREE from 'three';
// import { Physics } from "@react-three/rapier";
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import Display from '../components/display';
import Npc from './npc';


function Scene() {
    // useBGM();

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);
  const [visible, setVisible] = useState(false);
  const [painting, setPainting] = useState('');

  
  const getColliders = (colliders: Mesh[]) => {
    collidersRef.current = colliders;
  };

  const displayPainting = () => {
    setVisible(true);
    setPainting('ff14.png');
  }


  
  return (<>
    {visible && <Display painting={painting} />}
      <Canvas
          gl={{
            pixelRatio: window.devicePixelRatio,
            outputEncoding: THREE.sRGBEncoding,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          shadows={{ type: THREE.VSMShadowMap }}
        camera={{fov:45, far: 800, near: 0.1, position: [7, 24, 50],}}>
          <Suspense>
            {/* <Physics debug> */}
                <Player controlsRef={controlsRef} collidersRef={collidersRef}/>
                <Npc  modelName='Prostitute.fbx' 
                  textureName='SimplePeople_Prostitute_White.png'
                  position={[28,0,-18]}
                  rotateY={-1.23} />
                <Pool getColliders={getColliders}/>
                <Sculpture 
                    name='Cat.fbx'
                    position={[-85,4,-20]}
                    rotation={[0, 0, 0]}
                    scale={10}
                  />
                <Painting
                    name='ff14.png'
                    size={[24, 16]}
                    position={[37, 15, 0]}
                    rotation={[0, -1.23, 0]}
                    onClickPainting={displayPainting}
                />
              {/* </Physics> */}
              <OrbitControls 
                minDistance={10} maxDistance={80}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2.1}
                // enablePan={false}
                ref={controlsRef}
            />
            <hemisphereLight groundColor='#002244' intensity={0.8} />
            <directionalLight color='#ffffff'
                position={[- 5, 100, - 1]}
                castShadow
                shadow-bias={-0.0006}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            >
                <orthographicCamera attach='shadow-camera' args={[-100,100,100,-100,0.1,500]} />
            </directionalLight>
        </Suspense>
      </Canvas >
  </>);
}

export default Scene;
