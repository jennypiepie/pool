import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useEffect, useState } from 'react';
import { getExhibitsList, getSculptureList } from '../request/api';

export interface IExhibits{
    id:number
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
    beliked: string;
}

export interface ISculpture{
    id:number
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
        const { id, name,scale,position,rotation } = item;
        return (
            <Sculpture 
                key={id}
                name={name}
                scale={scale}
                position={position}
                rotation={rotation}
                onClickSculpture={()=>clickSculpture(item)}
            />
        )
    })
    
    const paintings = paintList.map((item) => {
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
        getSculptureList().then(result => {
            const res = result as any;
            if (res.errCode === 0) {
                const list = res.data.list;
                list.forEach((item: any) => {
                    item.position = item.position.split(',').map(Number);
                    item.rotation = item.rotation.split(',').map(Number);
                });
                setSculpList(list)
            }
        });
    },[])

    useEffect(() => {
        getExhibitsList().then(result => {
            const res = result as any;
            if (res.errCode === 0) {
                const list = res.data.list;
                list.forEach((item: any) => {
                    item.position = item.position.split(',').map(Number);
                    item.rotation = item.rotation.split(',').map(Number);
                    item.size = item.size.split(',').map(Number);
                });
                setPaintList(list)
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
