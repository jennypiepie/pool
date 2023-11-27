import { Navigate, useLocation } from "react-router-dom"

const AuthRoute = (props: any) => {
    const { children } = props;
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
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/site"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default AuthRoute