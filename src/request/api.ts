import request from './request'

export interface ILoginParams {
    username: string;
    password: string;
}

export interface ICollectParams {
    userId: number;
    exhibitsId: number;
    liked: boolean;
}

export interface IOutfitParams{
    userName: string,
    outfit:string
}

export const registerApi = (params: ILoginParams) => request.post('/register', params);

export const loginApi = (params: ILoginParams) => request.post('/login', params);

export const updateUser = (params: IOutfitParams) => request.post('/updateUser', params);

export const getExhibitsList = (params?:any) => request.post('/getExhibits',params);

export const collectExhibits = (params: ICollectParams) => request.post('./updateLikes', params);

export const getSculptureList = () => request.get('/getSculptures');
