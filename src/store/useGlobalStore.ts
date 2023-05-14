import { create } from 'zustand';

interface IGlobalStore {
    outfit: boolean;
    onClick: () => void;
    onFinish: () => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    outfit: false,
    onClick: () => set(() => {
        return {
            outfit:true
        }
    }),

    onFinish: () => set(() => {
        return {
            outfit: false
        }
    }),
}));