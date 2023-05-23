import { create } from 'zustand';

interface IGlobalStore {
    bgm: boolean;
    photoPopVisible: boolean;
    changeState: (state: boolean) => void;
    changePopoverState: (state:boolean) => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    photoPopVisible:false,
    changeState: (state:boolean) => set(() => {
        return {
            bgm: state,
        }
    }),
    changePopoverState: (state:boolean)=>set(() => {
        return {
            photoPopVisible: state,
        }
    }),
}));