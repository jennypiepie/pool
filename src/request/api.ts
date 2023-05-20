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

// 注册
export const registerApi = (params: ILoginParams) => request.post('/user/register', params);

// 登录
export const loginApi = (params: ILoginParams) => request.post('/user/login', params);

// 获取展品列表
export const getExhibitsList = (params?:any) => request.post('/exhibits/list',params);

//收藏展品
export const collectExhibits = (params: ICollectParams) => request.post('./exhibits/collect', params);

//添加照片
export const addPhoto = (params: IPhotoParams) => request.post('./photos/add', params);

// 获取照片列表
export const getPhotoList = (params: any) => request.post('./photos/list', params);

//上传照片
export const upload = (params:IPhotoParams)=>request.post('./photos/upload',params)