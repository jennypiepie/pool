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
    userId: number,
    outfit:string
}

export const registerApi = (params: ILoginParams) => request.post('/user/register', params);

// export const loginApi = (params: ILoginParams) => request.post('/user/login', params);
export const loginApi = (params: ILoginParams) => request.post('/login', params);

export const updateOutfit = (params: IOutfitParams) => request.post('/user/update', params);

export const getExhibitsList = (params?:any) => request.post('/exhibits/list',params);

export const collectExhibits = (params: ICollectParams) => request.post('./exhibits/collect', params);

export const getSculptureList = () => request.get('/sculptures/list');
