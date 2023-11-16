

function Lights() {

  return (<>
    <hemisphereLight groundColor='#033f4a' intensity={0.6} />
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

export default Lights;
