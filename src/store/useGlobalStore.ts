import { create } from 'zustand';

interface IGlobalStore {
    bgm: boolean;
    changeState: (state:boolean) => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    changeState: (state:boolean) => set(() => {
        return {
            bgm: state,
        }
    })
}));