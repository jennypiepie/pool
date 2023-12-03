import Sculpture from './sculpture';
import Painting from './painting';
import { Vector3Tuple, Vector3 } from 'three';
import { useExhibitsStore } from '../store/useExhibitsStore';
import { useEffect, useState } from 'react';
import { getExhibits, getPhotos, getSculptures } from '../request/api';
import { usePhotoStore } from '../store/usePhotoStore';

export interface IExhibits {
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    size: number[];
    likes: string[];
}

export interface ISculpture {
    _id: string;
    name: string;
    title: string;
    desc: string;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    scale: number;
    center: Vector3;
}

function Exhibits() {
    const { setLikes, needUpdate } = useExhibitsStore();
    const { addPhoto } = usePhotoStore();

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

        getExhibits().then(result => {
            const data = result.data;
            if (data.length) {
                setPaintList(data);
            }
        });

        const username = localStorage.getItem('username');
        if (username) {
            getExhibits({ username }).then(result => {
                const data = result.data;
                if (data.length) {
                    const resList = (data as any[]).map(item => item.name) as string[];
                    setLikes(resList);
                }
            });

            getPhotos({ username }).then(result => {
                const data = result.data;
                if (data.length) {
                    const resList = (data as any[]).map(item => {
                        return {
                            name: item.name,
                            url: item.base64,
                        }
                    });
                    addPhoto(resList);
                }
            });
        }
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
