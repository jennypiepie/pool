import { Html, useProgress } from '@react-three/drei'
import Loading from '../components/loading';

function Loader() {
    const { progress } = useProgress();
    const p = Math.floor(progress * 100) / 100;
    const loadText = `${p}%`
    return <Html>
        <Loading text={loadText} />
    </Html>
}

export default Loader;