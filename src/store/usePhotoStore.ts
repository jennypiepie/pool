import { create } from 'zustand';

interface IPhotoStore {
    photos: {
        current: string;
        shoot: boolean;
        visible: boolean;
    };
    list: string[];
    setShoot: (state: boolean) => void;
    addPhoto: (photo: string | string[]) => void;
    openPhotoList: () => void;
    onClose: () => void;
    clear: () => void;
};

export const usePhotoStore = create<IPhotoStore>((set) => ({
    photos: {
        current: '',
        shoot: false,
        visible: false,
    },
    list: [],
    setShoot: (state: boolean) => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                shoot: state
            },
        }
    }),
    addPhoto: (photo: string | string[]) => set(({ photos, list }) => {
        const newList = Array.isArray(photo) ? list.concat(photo) : [photo, ...list];
        const current = Array.isArray(photo) ? '' : photo;
        return {
            photos: {
                ...photos,
                current
            },
            list: newList
        }
    }),
    openPhotoList: () => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                visible: true
            },
        }
    }),
    onClose: () => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                visible: false
            },
        }
    }),
    clear: () => set(() => {
        return {
            list: [],
        }
    })
}));