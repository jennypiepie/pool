import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';
import * as THREE from 'three';
// import { Physics } from "@react-three/rapier";
import { OrbitControls } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import Display from '../components/display';
import Exhibits from './exhibits';
import Loading from '../components/loading';
import Panel from '../components/panel';
import Lights from './lights';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useOutfitStore } from '../store/useOutfitStore';
import { usePhotoStore } from '../store/usePhotoStore';
import OutfitPanel from '../components/outfitPanel';
import LikedList from '../components/likedList';
import PhotoList from '../components/photoList';
import SculpturePanel from '../components/sculpturePanel';
import BGM from '../hooks/bgm';
import { useGlobalStore } from '../store/useGlobalStore';
// import RetroTV from './retroTV';
// import { useWasdMove } from '../hooks/useWsadMove';

function Scene() {

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);

  const { display,sculpture } = useExhibitsStore();
  const { outfitShow } = useOutfitStore();
  const { likedList } = useExhibitsStore();
  const { setShoot, addPhoto, photos } = usePhotoStore();
  const { changePopoverState } = useGlobalStore()
  
  // const { controlsHook, } = useWasdMove();
  const getColliders = (colliders: Mesh[]) => {
    collidersRef.current = colliders;
  };
  const GetPhotos = () => {
    const { gl, scene, camera } = useThree();
    if (photos.shoot) {
      gl.render(scene, camera);
      const imgData = gl.domElement.toDataURL("image/jpeg", 1.0);
      const userId = Number(localStorage.getItem('userId'));
      const timestamp=(new Date()).valueOf();
      const name = `${userId}_${timestamp}`;

      const pObj = {
        name,
        url: imgData
      };

      
      addPhoto(pObj)
      setShoot(false);
      changePopoverState(true);
    }
    return null;
  };

  const MoveCamera = () => {
    const { camera } = useThree();
    useFrame(() => {
      camera.position.lerp(new Vector3(0,8,20), 0.05);
    });
    return null
  }
  
  return (<>
    <Suspense fallback={<Loading />}>
      <BGM />
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
        <Pool getColliders={getColliders} />
        <Exhibits />
        {/* <RetroTV/> */}
              {/* </Physics> */}
        {<OrbitControls 
                // minDistance={10} maxDistance={80}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2.1}
                // enablePan={false}
          enableDamping={true}
          target={[sculpture.position[0],
          sculpture.position[1] + 10, sculpture.position[2]]}
          ref={controlsRef}
        />}
        <Lights />
        <GetPhotos />
        {outfitShow && <MoveCamera />}
        {/* {controlsHook} */}
        {/* <axesHelper args={[50]} /> */}
      </Canvas >
      {!outfitShow&& !sculpture.hide && <Panel />}
      {display.visible && <Display />}
      {outfitShow && <OutfitPanel />}
      {likedList.visible && <LikedList />}
      {photos.visible && <PhotoList />}
      {sculpture.hide && <SculpturePanel/>}
    </Suspense>
  </>);
}

export default Scene;
