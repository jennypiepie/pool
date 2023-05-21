import { create } from 'zustand';

interface IGlobalStore {
    bgm: boolean;
    changeState: () => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    changeState: () => set(({bgm}) => {
        return {
            bgm:!bgm
        }
    })
}));