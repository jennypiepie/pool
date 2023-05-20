import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Player from './player';
import Pool from './pool';
import * as THREE from 'three';
// import { Physics } from "@react-three/rapier";
import { OrbitControls } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import Display from '../components/display';
// import Npc from './npc';
import Exhibits from './exhibits';
import Loading from '../components/loading';
import Panel from '../components/panel';
import Lights from './lights';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useOutfitStore } from '../store/useOutfitStore';
import { usePhotoStore } from '../store/usePhotoStore';
import OutfitPanel from '../components/outfitPanel';
import LikedList from '../components/likedList';
// import { addPhoto, upload } from '../request/api';
import PhotoList from '../components/photoList';
// import { useWasdMove } from '../hooks/useWsadMove';


function Scene() {

  const controlsRef = useRef(null);
  const collidersRef = useRef<Mesh[] | null>(null);

  const { display } = useExhibitsStore();
  const { outfit } = useOutfitStore();
  const { likedList } = useExhibitsStore();
  const { setShoot, addPhoto, photos } = usePhotoStore();
  


// function dataURLtoFile(dataurl:string, filename:string) {
//   const arr = dataurl.split(',');
//   //@ts-ignore
// 	let mime = arr[0].match(/:(.*?);/)[1];
// 	let bstr = window.atob(arr[1]);
// 	let n = bstr.length;
// 	let u8arr = new Uint8Array(n);
// 	while (n--) {
// 		u8arr[n] = bstr.charCodeAt(n);
// 	}
// 	return new File([u8arr], filename, {
// 		type: mime
// 	});
// }
  
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
      // const file = dataURLtoFile(imgData,'userId');
      // console.log(file);

      const pObj = {
        name,
        url: imgData
      };

      
      addPhoto(pObj)
      setShoot(false);
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
        {/* <Npc modelName='Prostitute.fbx'
          textureName='SimplePeople_Prostitute_White.png'
          position={[28, 0, -18]}
          rotateY={-1.23} /> */}
        <Pool getColliders={getColliders} />
        <Exhibits />
              {/* </Physics> */}
        {<OrbitControls 
                // minDistance={10} maxDistance={80}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2.1}
                // enablePan={false}
          ref={controlsRef}
        />}
        <Lights />
        <GetPhotos />
        {outfit && <MoveCamera />}
        {/* {controlsHook} */}
        <axesHelper args={[50]} />
      </Canvas >
      {!outfit && <Panel />}
      {display.visible && <Display />}
      {outfit && <OutfitPanel />}
      {likedList.visible && <LikedList />}
      {photos.visible && <PhotoList />}
    </Suspense>
  </>);
}

export default Scene;
