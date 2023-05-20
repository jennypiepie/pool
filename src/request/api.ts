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

export interface IPhotoParams{
    userId: number;
    // blob: Blob;
    url: string
}

export const registerApi = (params: ILoginParams) => request.post('/user/register', params);

export const loginApi = (params: ILoginParams) => request.post('/user/login', params);

export const getExhibitsList = (params?:any) => request.post('/exhibits/list',params);

export const collectExhibits = (params: ICollectParams) => request.post('./exhibits/collect', params);

export const getSculptureList = () => request.get('/sculptures/list');

// //添加照片
// export const addPhoto = (params: IPhotoParams) => request.post('./photos/add', params);

// // 获取照片列表
// export const getPhotoList = (params: any) => request.post('./photos/list', params);

// //上传照片
// export const upload = (params:IPhotoParams)=>request.post('./photos/upload',params)