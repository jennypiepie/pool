import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function R3FLoading() {
  const ref1 = useRef<Mesh>(new Mesh());
  const ref2 = useRef<Mesh>(new Mesh());
  const ref3 = useRef<Mesh>(new Mesh());
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref1.current!.position.y = Math.sin(t * 3) * 2 + 10;
    ref2.current!.position.y = Math.sin(t * 3 + 1) * 2 + 10;
    ref3.current!.position.y = Math.sin(t * 3 + 2) * 2 + 10;
  })
  return (
      <group>
        <mesh ref={ref1} position={[-2,0,-5]} scale={1}>
            <sphereGeometry />
            <meshStandardMaterial color={'#81ceeb'} />  
        </mesh>
          <mesh ref={ref2} position={[0, 0, -5]} scale={1}>
            <sphereGeometry />
            <meshStandardMaterial color={'#cdfffe'} />  
        </mesh>
        <mesh ref={ref3} position={[2, 0, -5]} scale={1}>
            <sphereGeometry  />
            <meshStandardMaterial color={'#a4e7ff'} />  
          </mesh>
    </group>
  );
}

export default R3FLoading;
