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
import LikesList from '../components/likesList';
import PhotoList from '../components/photoList';
import SculpturePanel from '../components/sculpturePanel';
// import BGM from '../hooks/bgm';
import { useGlobalStore } from '../store/useGlobalStore';
import R3FLoading from './r3fLoading';
// import { useWasdMove } from '../hooks/useWsadMove';

function Scene() {

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);

  const { display, sculpture, likesList } = useExhibitsStore();
  const { outfitShow } = useOutfitStore();
  const { setShoot, addPhoto, photos } = usePhotoStore();
  const { changePopoverState, playerPosition, cameraPosition, cameraRotation } = useGlobalStore();

  // const { controlsHook, } = useWasdMove();
  const getColliders = (colliders: Mesh[]) => {
    collidersRef.current = colliders;
  };
  const GetPhotos = () => {
    const { gl, scene, camera } = useThree();
    if (photos.shoot) {
      gl.render(scene, camera);
      const imgData = gl.domElement.toDataURL("image/jpeg", 1.0);
      const username = Number(localStorage.getItem('username'));
      const timestamp = (new Date()).valueOf();
      const name = `${username}_${timestamp}`;

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
      camera.position.lerp(new Vector3(0, 8, 20), 0.05);
    });
    return null
  }

  const CachedControls = () => {
    const { camera } = useThree();
    if (!sculpture.hide) {
      if (controlsRef.current && cameraPosition && cameraRotation) {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z);
        //@ts-ignore
        controlsRef.current.update();
      }
    }
    return (
      <OrbitControls
        minDistance={10} maxDistance={80}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.5}
        target={new Vector3(playerPosition.x, playerPosition.y + 8, playerPosition.z)}
        ref={controlsRef}
        enabled={!sculpture.hide}
      />
    );
  }

  return (<>
    <Suspense fallback={<Loading />}>
      {/* <BGM /> */}
      <Canvas
        gl={{
          pixelRatio: window.devicePixelRatio,
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        shadows={{ type: THREE.VSMShadowMap }}
        camera={{ fov: 45, far: 800, near: 0.1, position: [7, 24, 50] }}>
        <color attach="background" args={["#01222e"]} />
        <fog attach="fog" color="#042738" near={1} far={600} />
        <Suspense fallback={<R3FLoading />}>
          <Player controlsRef={controlsRef} collidersRef={collidersRef} />
        </Suspense>
        <Pool getColliders={getColliders} />
        <Suspense fallback={null}>
          <Exhibits />
        </Suspense>
        <CachedControls />
        {sculpture.hide && <OrbitControls
          minDistance={1} maxDistance={80}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.5}
          target={sculpture.center}
        />}
        <Lights />
        <GetPhotos />
        {outfitShow && <MoveCamera />}
      </Canvas >
      {!outfitShow && !sculpture.hide && <Panel />}
      {display.visible && <Display />}
      {outfitShow && <OutfitPanel />}
      {likesList.visible && <LikesList />}
      {photos.visible && <PhotoList />}
      {sculpture.hide && <SculpturePanel />}
    </Suspense>
  </>);
}

export default Scene;
