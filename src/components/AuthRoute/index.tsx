import { Navigate, useLocation } from "react-router-dom"

const AuthRoute = (props:any) => {
    const { children } = props
    // 拿到判断是否登录的变量
    const location = useLocation();
    const expire = 24 * 60 * 60 * 1000;
    let isLoggedIn;
    if (!localStorage.hasOwnProperty('time')) {
        isLoggedIn = false;
    } else {
        const time = localStorage.getItem('time');
        isLoggedIn = Date.now() - Number(time) < expire;
    }

    return isLoggedIn ? (
    // 如果是登录用户，则可以访问传入的 children 组件
        <>{children}</>
    ) : (
    // 未登录用户重定向到 login 页面
        <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default AuthRoute