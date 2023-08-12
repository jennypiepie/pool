import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useEffect, useState } from 'react';
import { getExhibits, getSculptures } from '../request/api';

export interface IExhibits{
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
    likes: string;
}

export interface ISculpture{
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    scale: number;
}

function Exhibits() {
    const { select,needUpdate,clickSculpture } = useExhibitsStore();
    const [paintList, setPaintList] = useState([]);
    const [sculpList, setSculpList] = useState([]);

    const sculptures = sculpList.map((item) => {
        const { _id, name,scale,position,rotation } = item;
        return (
            <Sculpture 
                key={_id}
                name={name}
                scale={scale}
                position={position}
                rotation={rotation}
                onClickSculpture={()=>clickSculpture(item)}
            />
        )
    })
    
    const paintings = paintList.map((item) => {
        const { _id, name,size,position,rotation } = item;
        return (
            <Painting
                key={_id}
                name={name}
                size={size}
                position={position}
                rotation={rotation}
                onClickPainting={()=>select(item)}
            />
        )
    })

    useEffect(() => {
        getSculptures().then(result => {
            const data = result.data;
            if (data.length) {
                setSculpList(data)
            }
        });
    },[])

    useEffect(() => {
        getExhibits().then(result => {
            const data = result.data;
            if (data.length) {
                setPaintList(data);
            }
        });
    }, [needUpdate])
    


    return (<>
        {/* <Sculpture
            name='Monument.fbx'
            position={[0, 4, 0]}
            rotation={[0, 0, 0]}
            scale={15}
            onClickSculpture={() => clickSculpture(
                {id:4,
                name: 'Monument.fbx',
                title: 'ttt',
                desc: 'dannaafa',
                position: [0,4,0],
                rotation: [0, 0, 0],
                scale: 10}
            )}
        /> */}
        {/* <Painting
            key={3}
            name='pic3.png'
            size={[24,16]}
            position={[45,15,-35]}
            rotation={[0,Math.PI,0]}
            onClickPainting={() => select({
                id:4,
                name:'pic3.png',
                title:'titieeee',
                desc:'bvansg hbwiwwi',
                position: [0,0,0],
                rotation:[0,0,0] ,
                size: [24,16],
                beliked:'', 
            })}
        /> */}
        {paintings}
        {sculptures}
    </>);
    
}

export default Exhibits;
