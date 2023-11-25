import { useExhibitsStore } from "../store/useExhibitsStore";

const SceneLights = () => {
  return (<>
    <hemisphereLight groundColor='#033f4a' intensity={0.2} />
    <directionalLight color='#033f4a'
      position={[- 5, 100, - 1]}
      castShadow
      shadow-bias={-0.0006}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    >
      <orthographicCamera attach='shadow-camera' args={[-100, 100, 100, -100, 0.1, 500]} />
    </directionalLight>
  </>);
}

const DetailLights = () => {
  return (<>
    <directionalLight color='#eeb8ee'
      position={[-5, 10, 3]}
      intensity={0.2}
    />
    <directionalLight color='#b8eec0'
      position={[5, 10, -3]}
      intensity={0.2}
    />
    <hemisphereLight groundColor='#caecf2' intensity={0.05} />
  </>)
}

function Lights() {
  const { sculpture } = useExhibitsStore();

  return (<>
    {!sculpture.hide && <SceneLights />}
    {sculpture.hide && <DetailLights />}
  </>);

}

export default Lights;
