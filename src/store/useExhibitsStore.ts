import { create } from 'zustand'
import { IExhibits } from '../r3f/exhibits';


interface IDisplay{
    name: string,
    title: string,
    desc: string,
    visible:boolean,
}
interface IExhibitsStore {
    display: IDisplay;
    select: (selected: IExhibits) => void;
    close: () => void;
};

export const useExhibitsStore = create<IExhibitsStore>((set) => ({
    display: {
        visible:false,
        name: '',
        title: '',
        desc: '',
    },
    select: (selected: IExhibits) => set(() => {
        return {
            display: {
                name: selected.name,
                title: selected.title,
                desc: selected.desc,
                visible: true,
            }
        }
    }),

    close: () => set(() => {
        return {
            display: {
                name: '',
                title: '',
                desc: '',
                visible: false,
            }
        }
    })
}));