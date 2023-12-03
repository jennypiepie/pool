import { create } from 'zustand';

interface IPhotoInfo {
    name: string;
    url: string;
}

interface IPhotoStore {
    photos: {
        origin: string;
        shoot: boolean;
        visible: boolean;
        isCrop: boolean;
    };
    list: IPhotoInfo[];
    setShoot: (state: boolean) => void;
    setIsCrop: (state: boolean) => void;
    setOriginImg: (photo: string) => void;
    addPhoto: (photo: IPhotoInfo | IPhotoInfo[]) => void;
    delPhoto: (photo: IPhotoInfo) => void;
    openPhotoList: () => void;
    closePhotoList: () => void;
    clearPhotos: () => void;
};

export const usePhotoStore = create<IPhotoStore>((set) => ({
    photos: {
        origin: '',
        shoot: false,
        visible: false,
        isCrop: false,
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
    setIsCrop: (state: boolean) => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                isCrop: state
            },
        }
    }),
    setOriginImg: (img: string) => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                origin: img
            }
        }
    }),
    addPhoto: (photo: IPhotoInfo | IPhotoInfo[]) => set(({ list }) => {
        const newList = Array.isArray(photo) ? list.concat(photo) : [...list, photo];

        return {
            list: newList
        }
    }),
    delPhoto: (photo: IPhotoInfo) => set(({ list }) => {
        const newList = list.filter(item => item.name !== photo.name);

        return {
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
    closePhotoList: () => set(({ photos }) => {
        return {
            photos: {
                ...photos,
                visible: false
            },
        }
    }),
    clearPhotos: () => set(() => {
        return {
            list: [],
        }
    })
}));