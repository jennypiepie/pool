import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useEffect, useState } from 'react';
import { getExhibits, getSculptures } from '../request/api';

export interface IExhibits {
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
    likes: string;
}

export interface ISculpture {
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    scale: number;
    center: Vector3Tuple;
}

function Exhibits() {
    const { needUpdate } = useExhibitsStore();
    const [paintList, setPaintList] = useState([]);
    const [sculpList, setSculpList] = useState([]);

    const sculptures = sculpList.map((item: ISculpture) => {
        return (
            <Sculpture item={item} key={item._id} />
        )
    })

    const paintings = paintList.map((item: IExhibits) => {
        return (
            <Painting item={item} key={item._id} />
        )
    })

    useEffect(() => {
        getSculptures().then(result => {
            const data = result.data;
            if (data.length) {
                setSculpList(data)
            }
        });
    }, [])

    useEffect(() => {
        getExhibits().then(result => {
            const data = result.data;
            if (data.length) {
                setPaintList(data);
            }
        });
    }, [needUpdate])


    return (<>
        {paintings}
        {sculptures}
    </>);

}

export default Exhibits;
