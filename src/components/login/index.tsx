import './index.scss'

function Login() {
  return (
    <div id="page" className="site">
    <div className="container">
        <div className="login">
            <div className="hero">
                <h1>WELCOME<br/>TO MY DREAM</h1>
                <p>如果你没有账号<br/>可以<a href="#">点击这里</a>进行注册.</p>
            </div>
            <div className="main">
                <form action="">
                    <p>
                        <input type="email" placeholder="邮箱"/>
                    </p>
                    <p className="password">
                        <input type="password" placeholder="密码"/>
                        <i className="ri-eye-off-line"></i>
                        <a href="#">找回密码</a>
                    </p>
                    <p>
                        <input type="submit" className="submit" value="登录" />
                    </p>
                </form>
                {/* <div className="options">
                    <div className="separator">
                        <p>使用其他方式登录</p>
                    </div>
                    <ul>
                        <li><a href="#"><i className="ri-steam-fill ri-2x"></i></a></li>
                        <li><a href="#"><i className="ri-playstation-fill ri-2x"></i></a></li>
                        <li><a href="#"><i className="ri-xbox-fill ri-2x"></i></a></li>
                    </ul>
                </div> */}
            </div>
        </div>
    </div>
</div>
  );
}

export default Login;
