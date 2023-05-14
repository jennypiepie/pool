import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useEffect, useState } from 'react';
import { getExhibitsList } from '../request/api';

export interface IExhibits{
    id:number
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
}
  

function Exhibits() {
    const { select } = useExhibitsStore();
    const [exhibitsList, setExhibitsList] = useState([]);

    const getList = async () => {
        await getExhibitsList().then(res => {
            //@ts-ignore
            if (res.errCode === 0) {
            const list = res.data.list;
            list.forEach((item: any) => {
                item.position = item.position.split(',');
                item.rotation = item.rotation.split(',');
                item.size = item.size.split(',');
            });
            setExhibitsList(list)
            }
        })
    }
    

    const exhibits = exhibitsList.map((item) => {
        const { id, name,size,position,rotation } = item;
        return (
            <Painting
                key={id}
                name={name}
                size={size}
                position={position}
                rotation={rotation}
                onClickPainting={()=>select(item)}
            />
        )
    })


    useEffect(() => { 
        getList();
    },[])

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
    </>);
    
}

export default Exhibits;
