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
export const RegisterApi = (params:ILoginParams) => request.post('/register', params)

// 登录
export const LoginApi = (params:ILoginParams) => request.post('/login', params)

// 获取展品列表
export const getExhibitsList = (params?:any) => request.post('/exhibits/list',params);

//收藏展品
export const collectExhibits = (params: ICollectParams) => request.post('./exhibits/collect',params);
