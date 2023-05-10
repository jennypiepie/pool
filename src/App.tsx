import { Suspense } from 'react';
import Login from './components/login';
import Panel from './components/panel';
import View3D from './components/view3D';
import Scene from './r3f/scene';

function App() {
  return (
    <>
      {false&&<Login />}

      {false && <>
        <Suspense fallback={null}>
          <View3D />
        </Suspense>
        <Panel/>
      </>}

      <Scene />
    </>
  );
}

export default App;
