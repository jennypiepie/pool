import { create } from 'zustand';

interface IOutfitStore {
    outfit: boolean;
    player: {
        role: string;
        skin:string;
    }
    onClick: () => void;
    onFinish: () => void;
    changeRole: (dir: string) => void;
    changeSkin: (color: string) => void;
};

const roleList = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Policeman',
    'Prostitute', 'Punk', 'RiotCop', 'Robber', 'Sheriff', 'StreetMan', 'Waitress'];

export const useOutfitStore = create<IOutfitStore>((set) => ({
    outfit: false,
    player: {
        role: 'BeachBabe',
        skin:'White',
    },
    onClick: () => set(() => {
        return {
            outfit: true,
        }
    }),

    onFinish: () => set(() => {
        return {
            outfit: false
        }
    }),
    changeRole: (dir:string) => set(({player}) => {
        const currentIndex = roleList.findIndex(item => item === player.role);
        const index = dir === 'pre' ? (currentIndex + roleList.length - 1) % roleList.length
            : (currentIndex + 1) % roleList.length;
        return {
            player: {
                role: roleList[index],
                skin: player.skin,
            }
        }
    }),
    changeSkin:(color:string) => set(({player}) => {
        return {
            player: {
                role: player.role,
                skin: color,
            }
        }
    }),
}));