import { create } from "zustand";

interface IUserInfo {
    username: string;
    userId: number;
    liked: string;
    likedList: string[];
}

interface IUserStore {
    user: IUserInfo,
    setUser: (user: IUserInfo) => void;
    setList: (list: string[]) => void;
};

export const useUserStore = create<IUserStore>((set) => ({
    user: {
        username: '',
        userId: -1,
        liked: '',
        likedList:[],
    },
    setUser: (user:IUserInfo) => set(() => {
        return {
            user:user,
        }
    }),
    setList: (list: string[]) => set(({user}) => {
        return {
            user: {
                ...user,
                likedList:list,
            }
        }
    })
}));