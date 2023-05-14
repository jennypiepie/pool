import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';

export interface IExhibits{
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
}

const exhibitsList:IExhibits[] = [
    {
        name: 'pic1.png',
        title: 'title1',
        desc: 'desc1 nciwnc icvfnvw ufcnwinccw nwci iwecfnc rewncv cvvfdw',
        position: [37, 15, 0],
        rotation: [0, -1.23, 0],
        size: [24, 16],
    },
    {
        name: 'pic2.png',
        title: 'title2',
        desc: 'desc2 nciwnc icvfnvw ufcnwinccw nwci iwecfnc rewncv cvvfdw',
        position: [80, 15, -30],
        rotation: [0, 0, 0],
        size: [32, 20],
    },
]

function Exhibits() {
    const {select} = useExhibitsStore();

    const exhibits = exhibitsList.map((item) => {
        const { name,size,position,rotation } = item;
        return (
            <Painting
                name={name}
                size={size}
                position={position}
                rotation={rotation}
                onClickPainting={()=>select(item)}
            />
        )
    })

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
        
        {exhibits}
        {/* <Painting
            name='pic1.png'
            size={[24, 16]}
            position={[37, 15, 0]}
            rotation={[0, -1.23, 0]}
            onClickPainting={()=>onOpen('pic1.png')}
        />

         <Painting
            name='pic2.png'
            size={[32, 20]}
            position={[80, 15, -30]}
            rotation={[0, 0, 0]}
            onClickPainting={()=>onOpen('pic2.png')}
        /> */}
    </>);
    
}

export default Exhibits;
