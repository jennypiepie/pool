import { create } from 'zustand';

interface IOutfitStore {
    outfitShow: boolean;
    outfit: {
        role: string;
        skin:string;
    }
    onClick: () => void;
    onFinish: () => void;
    init: (outfits: string) => void;
    reset: () => void;
    changeRole: (dir: string) => void;
    changeSkin: (color: string) => void;
};

const roleList = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Policeman',
    'Prostitute', 'Punk', 'RiotCop', 'Robber', 'Sheriff', 'StreetMan', 'Waitress'];

export const useOutfitStore = create<IOutfitStore>((set) => ({
    outfitShow: false,
    outfit: {
        role: 'Waitress',
        skin:'White',
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
    init: (outfits: string) => set(() => {
        const list = outfits.split(',');
        return {
            outfit: {
                role: list[0],
                skin: list[1],
            }
        }
    }),
    reset: () => set(() => {
        return {
            outfit: {
                role: 'Waitress',
                skin:'White',
            }
        }
    }),
    changeRole: (dir:string) => set(({outfit}) => {
        const currentIndex = roleList.findIndex(item => item === outfit.role);
        const index = dir === 'pre' ? (currentIndex + roleList.length - 1) % roleList.length
            : (currentIndex + 1) % roleList.length;
        return {
            outfit: {
                role: roleList[index],
                skin: outfit.skin,
            }
        }
    }),
    changeSkin:(color:string) => set(({outfit}) => {
        return {
            outfit: {
                role: outfit.role,
                skin: color,
            }
        }
    }),
}));