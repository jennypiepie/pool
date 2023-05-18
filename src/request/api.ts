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

// 注册
export const registerApi = (params: ILoginParams) => request.post('/user/register', params);

// 登录
export const loginApi = (params: ILoginParams) => request.post('/user/login', params);

//获取用户信息
export const getUserInfo = (params: {userId:number}) => request.post('/user/list', params);

// 获取展品列表
export const getExhibitsList = (params?:any) => request.post('/exhibits/list',params);

//收藏展品
export const collectExhibits = (params: ICollectParams) => request.post('./exhibits/collect',params);
