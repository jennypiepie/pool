import { Vector3Tuple } from 'three';
import { create } from 'zustand'
import { IExhibits,ISculpture } from '../r3f/exhibits';
interface IDisplay {
    exhibitsId: number;
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
    title: string;
    desc: string;
}
interface IExhibitsStore {
    display: IDisplay;
    needUpdate: boolean;
    likedList: ILikedList,
    sculpture: ISculptureInfo;
    select: (selected: IExhibits) => void;
    close: () => void;
    openLikedList: () => void;
    closeLikedList: () => void;
    clickSculpture: (selected:ISculpture) => void;
    closeSculpture: () => void;
};

export const useExhibitsStore = create<IExhibitsStore>((set) => ({
    display: {
        exhibitsId: -1,
        visible:false,
        name: '',
        title: '',
        desc: '',
        beliked: false,
        likedNum: 0,
    },
    needUpdate: true,
    likedList: {
        visible: false,
    },
    sculpture: {
        hide: false,
        name:'',
        position: [0, -2, 0],
        title: '',
        desc:'',
    },
    select: (selected: IExhibits) => set(() => {
        const list = selected.beliked.split(',').filter(item=>item!=="");
        const likedNum = list.length;
        const beliked = list.includes(localStorage.getItem('userId')||'');
        return {
            display: {
                exhibitsId: selected.id,
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
    openLikedList:() => set(() => {
        return {
            likedList: {
                visible:true
            }
        }
    }),
    closeLikedList:() => set(() => {
        return {
            likedList: {
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
                desc:selected.desc,
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