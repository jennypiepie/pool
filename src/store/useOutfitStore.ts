import { create } from 'zustand';

interface IOutfitStore {
    outfitShow: boolean;
    outfit: {
        role: string | undefined;
        skin: string | undefined;
    }
    roleList: string[];
    skinList: string[];
    setOutfit: () => void;
    close: () => void;
    reset: () => void;
    changeRole: (dir: string) => void;
    changeSkin: (color: string) => void;
};

const roleList = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Policeman',
    'Prostitute', 'Punk', 'RiotCop', 'Robber', 'Sheriff', 'StreetMan', 'Waitress'];

const skinList = ['White', 'Brown', 'Black'];

const list = localStorage.getItem('outfit')?.split(',') || [];

export const useOutfitStore = create<IOutfitStore>((set) => ({
    outfitShow: false,
    outfit: {
        role: list[0],
        skin: list[1],
    },
    roleList: roleList,
    skinList: skinList,
    setOutfit: () => set(() => {
        return {
            outfitShow: true,
        }
    }),

    close: () => set(() => {
        return {
            outfitShow: false
        }
    }),
    reset: () => set(() => {
        return {
            outfit: {
                role: undefined,
                skin: undefined,
            }
        }
    }),
    changeRole: (role) => set(({ outfit }) => {
        const list = localStorage.getItem('outfit')?.split(',')!;
        const currentIndex = roleList.findIndex(item => item === (outfit.role || list[0]));
        let res;
        if (role === 'pre' || role === 'next') {
            const index = role === 'pre' ? (currentIndex + roleList.length - 1) % roleList.length
                : (currentIndex + 1) % roleList.length;
            res = roleList[index];
        } else {
            res = role;
        }

        return {
            outfit: {
                role: res,
                skin: outfit.skin || list[1],
            }
        }
    }),
    changeSkin: (color) => set(({ outfit }) => {
        const list = localStorage.getItem('outfit')?.split(',')!;
        return {
            outfit: {
                role: outfit.role || list[0],
                skin: color,
            }
        }
    })
}));