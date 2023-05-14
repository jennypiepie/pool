import request from './request'

// 注册
// export const RegisterApi = (params) => request.post('/register', params)

// 登录
// export const LoginApi = (params) => request.post('/login', params)

// 获取展品列表
export const getExhibitsList = () => request.get('/exhibits/list');
