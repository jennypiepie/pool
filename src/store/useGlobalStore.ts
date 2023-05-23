import { create } from 'zustand';

interface IGlobalStore {
    bgm: boolean;
    changeState: (forceClose?:boolean) => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    changeState: (forceClose?:boolean) => set(({bgm}) => {
        return {
            bgm: forceClose!==undefined ? !bgm : forceClose,
        }
    })
}));