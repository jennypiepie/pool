import { create } from 'zustand';

interface IOutfitStore {
    outfitShow: boolean;
    outfit: {
        role: string | undefined;
        skin:string | undefined;
    }
    onClick: () => void;
    onFinish: () => void;
    reset: () => void;
    changeRole: (dir: string) => void;
    changeSkin: (color: string) => void;
};

const roleList = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Policeman',
    'Prostitute', 'Punk', 'RiotCop', 'Robber', 'Sheriff', 'StreetMan', 'Waitress'];

const list = localStorage.getItem('outfit')?.split(',') || [];

export const useOutfitStore = create<IOutfitStore>((set) => ({
    outfitShow: false,
    outfit: {
        role: list[0],
        skin:list[1],
    },
    onClick: () => set(() => {
        return {
            outfitShow: true,
        }
    }),

    onFinish: () => set(() => {
        return {
            outfitShow: false
        }
    }),
    reset: () => set(() => {
        return {
            outfit: {
                role: undefined,
                skin:undefined,
            }
        }
    }),
    changeRole: (dir: string) => set(({ outfit }) => {
        const list = localStorage.getItem('outfit')?.split(',')!;
        const currentIndex = roleList.findIndex(item => item === (outfit.role || list[0]));
        const index = dir === 'pre' ? (currentIndex + roleList.length - 1) % roleList.length
            : (currentIndex + 1) % roleList.length;
        return {
            outfit: {
                role: roleList[index],
                skin: outfit.skin||list[1],
            }
        }
    }),
    changeSkin: (color: string) => set(({ outfit }) => {
        const list = localStorage.getItem('outfit')?.split(',')!;
        return {
            outfit: {
                role: outfit.role || list[0],
                skin: color,
            }
        }
    }),
}));