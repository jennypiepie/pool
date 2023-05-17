import { create } from 'zustand'
import { IExhibits } from '../r3f/exhibits';

interface IDisplay{
    exhibitsId: number;
    name: string,
    title: string,
    desc: string,
    visible: boolean,
    beliked: boolean;
    likedNum: number;
}
interface IExhibitsStore {
    display: IDisplay;
    needUpdate: boolean;
    select: (selected: IExhibits) => void;
    close: () => void;
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
    needUpdate:true,
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
}));