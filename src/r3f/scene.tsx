import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';

function Scene() {
  return (
    <>
      <Canvas
        gl={{ antialias: true, }}
        camera={{ position: [7, 24, 50], far: 8000, near: 1 }}>
        <Suspense>
          <Player/>
          <Pool/>
        </Suspense>
        <hemisphereLight groundColor='#0x002244' intensity={0.8} />
        <directionalLight color='0xffffff'
            position={[- 5, 100, - 1]}
            castShadow
            shadow-bias={-0.0006}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        >
            <orthographicCamera attach='shadow-camera' args={[-100,100,100,-100,0.1,500]} />
        </directionalLight>
      </Canvas >
    </>
  );
}

export default Scene;
