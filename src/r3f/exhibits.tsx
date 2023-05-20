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
            name='Cat.fbx'
            position={[-85, 4, -20]}
            rotation={[0, 0, 0]}
            scale={10}
            onClickSculpture={() => clickSculpture(
                {id:1,
                name: 'Cat.fbx',
                title: 'ttt',
                desc: 'dannaafa',
                position: [-85, 4, -20],
                rotation: [0, 0, 0],
                scale: 10}
            )}
        /> */}
        {/* <Sculpture 
            name='Bird.fbx'
            position={[38, 14, 92]}
            rotation={[0, 0, 0]}
            scale={1}
            onClickSculpture={() => clickSculpture(
                {id:2,
                name: 'Bird.fbx',
                title: 'ttt',
                desc: 'dannaafa',
                position: [38, 14, 92],
                rotation: [0, 0, 0],
                scale: 1}
            )}
        />
        <Sculpture 
            name='Dog.fbx'
            position={[-80, 24, 100]}
            rotation={[0, -3, 0]}
            scale={0.1}
            onClickSculpture={() => clickSculpture(
                {id:3,
                name: 'Dog.fbx',
                title: 'ttt',
                desc: 'dannaafa',
                position: [-80, 24, 100],
                rotation: [0, -3, 0],
                scale: 0.1}
            )}
        />
         */}
        {paintings}
        {sculptures}
    </>);
    
}

export default Exhibits;
