import { Vector3Tuple, Vector3 } from 'three';
import { create } from 'zustand'
import { ISculpture } from '../r3f/exhibits';
interface IDisplay {
    name: string,
    title: string,
    desc: string,
    visible: boolean,
    beliked: boolean;
    likedNum: number;
    fromLikes: boolean;
}

interface IListItem {
    _id: string;
    name: string,
    title: string,
    desc: string,
    likes: string[]
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
    displayList: IListItem[];
    likes: ILikedList,
    sculpture: ISculptureInfo;
    select: (selected: string, fromLikes?: boolean) => void;
    close: () => void;
    setLikes: (name: string | string[], add?: boolean) => void;
    openLikesList: () => void;
    closeLikesList: () => void;
    clickSculpture: (selected: ISculpture) => void;
    closeSculpture: () => void;
    clearLikesList: () => void;
    initList: (list: IListItem[]) => void;
};

export const useExhibitsStore = create<IExhibitsStore>((set) => ({
    display: {
        visible: false,
        name: '',
        title: '',
        desc: '',
        beliked: false,
        likedNum: 0,
        fromLikes: false
    },
    displayList: [],
    likes: {
        visible: false,
        list: [],
    },
    sculpture: {
        hide: false,
        name: '',
        position: [0, -2, 0],
        center: new Vector3(),
        title: '',
        desc: '',
    },
    select: (selected, fromLikes = false) => set(({ displayList }) => {
        const d = displayList.find(item => item.name === selected)!;
        const beliked = d.likes.includes(localStorage.getItem('username') || '');

        return {
            display: {
                name: d.name,
                title: d.title,
                desc: d.desc,
                visible: true,
                beliked,
                likedNum: d.likes.length,
                fromLikes: fromLikes
            },
        }
    }),
    close: () => set(({ display }) => {
        return {
            display: {
                ...display,
                visible: false,
            }
        }
    }),
    setLikes: (name, add = true) => set(({ likes, displayList }) => {
        const orginList = likes.list;
        const list = Array.isArray(name) ?
            orginList.concat(name) :
            add ?
                [...orginList, name] :
                orginList.filter((item) => item !== name);

        if (!Array.isArray(name)) {
            const d = displayList.find(item => item.name === name)!;
            const username = localStorage.getItem('username') || '';
            const index = d.likes.findIndex(item => item === username);
            index === -1 ? d.likes.push(username) : d.likes.splice(index, 1);
        }

        return {
            likes: {
                ...likes,
                list
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
    closeLikesList: () => set(({ likes, display }) => {
        return {
            likes: {
                ...likes,
                visible: false
            },
            display: {
                ...display,
                fromLikes: false
            }
        }
    }),
    clickSculpture: (selected) => set(() => {
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
    }),
    initList: (list) => set(() => {
        return {
            displayList: list
        }
    })
}));