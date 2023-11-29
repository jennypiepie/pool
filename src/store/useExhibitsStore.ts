import { Vector3Tuple, Vector3 } from 'three';
import { create } from 'zustand'
import { IExhibits, ISculpture } from '../r3f/exhibits';
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
    list: string[];
}

interface ISculptureInfo {
    hide: boolean;
    name: string;
    position: Vector3Tuple;
    center: Vector3;
    title: string;
    desc: string;
}
interface IExhibitsStore {
    display: IDisplay;
    needUpdate: boolean;
    likes: ILikedList,
    sculpture: ISculptureInfo;
    select: (selected: IExhibits) => void;
    close: () => void;
    setLikes: (name: string | string[], add?: boolean) => void;
    openLikesList: () => void;
    closeLikesList: () => void;
    clickSculpture: (selected: ISculpture) => void;
    closeSculpture: () => void;
    clearLikesList: () => void;
};

export const useExhibitsStore = create<IExhibitsStore>((set) => ({
    display: {
        exhibitsId: '-1',
        visible: false,
        name: '',
        title: '',
        desc: '',
        beliked: false,
        likedNum: 0,
    },
    needUpdate: false,
    likes: {
        visible: false,
        list: []
    },
    sculpture: {
        hide: false,
        name: '',
        position: [0, -2, 0],
        center: new Vector3(),
        title: '',
        desc: '',
    },
    select: (selected: IExhibits) => set(({ display }) => {
        const list = selected.likes;
        let likedNum = selected._id === display.exhibitsId ?
            display.likedNum :
            list.length;
        let beliked = selected._id === display.exhibitsId ?
            display.beliked :
            list.includes(localStorage.getItem('username') || '');

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
            needUpdate: false,
        }
    }),
    close: () => set(({ display }) => {
        return {
            display: {
                ...display,
                visible: false,
            },
            needUpdate: true,
        }
    }),
    setLikes: (name: string | string[], add = true) => set(({ likes, display }) => {
        const orginList = likes.list;
        const list = Array.isArray(name) ?
            orginList.concat(name) :
            add ?
                [...orginList, name] :
                orginList.filter((item) => item !== name);

        const likedNum = Array.isArray(name) ?
            display.likedNum :
            add ?
                display.likedNum + 1 :
                display.likedNum - 1;
        const beliked = Array.isArray(name) ?
            display.beliked :
            add ?
                true :
                false;

        return {
            likes: {
                ...likes,
                list
            },
            display: {
                ...display,
                beliked,
                likedNum
            }
        }
    }),
    openLikesList: () => set(({ likes }) => {
        return {
            likes: {
                ...likes,
                visible: true
            }
        }
    }),
    closeLikesList: () => set(({ likes }) => {
        return {
            likes: {
                ...likes,
                visible: false
            }
        }
    }),
    clickSculpture: (selected: ISculpture) => set(() => {
        return {
            sculpture: {
                hide: true,
                name: selected.name,
                position: selected.position,
                title: selected.title,
                desc: selected.desc,
                center: selected.center
            }
        }
    }),
    closeSculpture: () => set(({ sculpture }) => {
        return {
            sculpture: {
                ...sculpture,
                hide: false,
            }
        }
    }),
    clearLikesList: () => set(() => {
        return {
            likes: {
                visible: false,
                list: []
            },
        }
    })
}));