import { Vector3Tuple } from 'three';
import { create } from 'zustand'
import { IExhibits,ISculpture } from '../r3f/exhibits';
interface IDisplay {
    exhibitsId: string;
    name: string,
    title: string,
    desc: string,
    visible: boolean,
    beliked: boolean;
    likedNum: number;
}

interface ILikedList {
    visible: boolean;
}

interface ISculptureInfo {
    hide: boolean;
    name: string;
    position: Vector3Tuple;
    center: Vector3Tuple;
    title: string;
    desc: string;
}
interface IExhibitsStore {
    display: IDisplay;
    needUpdate: boolean;
    likesList: ILikedList,
    sculpture: ISculptureInfo;
    select: (selected: IExhibits) => void;
    close: () => void;
    openLikesList: () => void;
    closeLikesList: () => void;
    clickSculpture: (selected:ISculpture) => void;
    closeSculpture: () => void;
};

export const useExhibitsStore = create<IExhibitsStore>((set) => ({
    display: {
        exhibitsId: '-1',
        visible:false,
        name: '',
        title: '',
        desc: '',
        beliked: false,
        likedNum: 0,
    },
    needUpdate: true,
    likesList: {
        visible: false,
    },
    sculpture: {
        hide: false,
        name:'',
        position: [0, -2, 0],
        center: [0, 0, 0],
        title: '',
        desc:'',
    },
    select: (selected: IExhibits) => set(() => {
        const list = selected.likes;
        const likedNum = list.length;
        const beliked = list.includes(localStorage.getItem('username')||'');
        return {
            display: {
                exhibitsId: selected._id,
                name: selected.name,
                title: selected.title,
                desc: selected.desc,
                visible: true,
                beliked,
                likedNum
            },
            needUpdate:true,
        }
    }),
    close: () => set(({display}) => {
        return {
            display: {
                ...display,
                visible: false,
            },
            needUpdate:false,
        }
    }),
    openLikesList:() => set(() => {
        return {
            likesList: {
                visible:true
            }
        }
    }),
    closeLikesList:() => set(() => {
        return {
            likesList: {
                visible:false
            }
        }
    }),
    clickSculpture: (selected: ISculpture) => set(() => {
        return {
            sculpture: {
                hide: true,
                name:selected.name,
                position: selected.position,
                title: selected.title,
                desc: selected.desc,
                center: selected.center
            }
        }
    }),
    closeSculpture: () => set(({sculpture}) => {
        return {
            sculpture: {
                ...sculpture,
                hide: false,
            }
        }
    })
}));