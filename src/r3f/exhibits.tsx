import Sculpture from './sculpture';
import Painting from './painting';

interface IProps{
    onOpen: (name:string) => void;
}

function Exhibits(props: IProps) {
    const {onOpen} = props

    return (<>
        <Sculpture
            name='Cat.fbx'
            position={[-85, 4, -20]}
            rotation={[0, 0, 0]}
            scale={10}
        />
        <Sculpture 
            name='Bird.fbx'
            position={[10, 4, 10]}
            rotation={[0, 0, 0]}
            scale={1}
        />
        <Sculpture 
            name='Dog.fbx'
            position={[-80, 24, 100]}
            rotation={[0, -3, 0]}
            scale={0.1}
        />
        
        <Painting
            name='ff14.png'
            size={[24, 16]}
            position={[37, 15, 0]}
            rotation={[0, -1.23, 0]}
            onClickPainting={()=>onOpen('ff14.png')}
        />
    </>);
    
}

export default Exhibits;
