import request from './request'

export interface ILoginParams {
    username: string;
    password: string;
}

export interface ICollectParams {
    exhibitsName: string;
    username: string;
}

export interface IOutfitParams{
    username: string,
    outfit:string
}

export const registerApi = (params: ILoginParams) => request.post('/register', params);

export const loginApi = (params: ILoginParams) => request.post('/login', params);

export const updateUser = (params: IOutfitParams) => request.post('/updateUser', params);

export const getExhibits = (params?:any) => request.post('/getExhibits',params);

export const updateLikes = (params: ICollectParams) => request.post('./updateLikes', params);

export const getSculptures = () => request.get('/getSculptures');
