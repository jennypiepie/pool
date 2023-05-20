import { create } from 'zustand';

interface IPhotoInfo {
    name: string;
    url: string;
}
interface IPhotoStore {
    photos: {
        current: string;
        shoot: boolean;
        visible: boolean;
    };
    list: IPhotoInfo[];
    setShoot: (state: boolean) => void;
    addPhoto: (pObj:IPhotoInfo) => void;
    openPhotoList: () => void;
    onClose: () => void;
};

export const usePhotoStore = create<IPhotoStore>((set) => ({
    photos: {
        current: '',
        shoot: false,
        visible: false,
    },
    list:[],
    setShoot: (state:boolean) => set(({photos}) => {
        return {
            photos: {
                ...photos,
                shoot:state
            },
        }
    }),
    addPhoto: (pObj: IPhotoInfo) => set(({ photos, list }) => {
        list.unshift(pObj);
        return {
            photos: {
                ...photos,
                current:pObj.url
            },
            // list:newList
        }
    }),
    openPhotoList: () => set(({photos}) => {
        return {
            photos: {
                ...photos,
                visible:true
            },
        }
    }),
     onClose: () => set(({photos}) => {
        return {
            photos: {
                ...photos,
                visible:false
            },
        }
    }),
}));