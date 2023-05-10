import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

function Sculpture(model:string) {

    const ply = useLoader(
        PLYLoader,
        require(`@/assets/model/${model}`),
    )
    return (
      <primitive object={group}/>
    )
}

export default Sculpture;
