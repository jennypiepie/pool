import { ILoginParams, loginApi, registerApi } from '@/src/request/api';
import { useGlobalStore } from '@/src/store/useGlobalStore';
import { useOutfitStore } from '@/src/store/useOutfitStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import './index.scss';


function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { changeState } = useGlobalStore();
    const { init } = useOutfitStore();

    const login = (params: ILoginParams) => {
        loginApi({
            username: params.username,
            password: params.password,
        }).then(result => {
            const res = result as any;
            if (res.errCode === 0) {
                message.success(res.message);
                
                let obj;
                if (localStorage.hasOwnProperty('time')) {
                    const time = JSON.parse(localStorage.getItem('time')!)
                    obj = {
                        lastLoginTime: time.curLoginTime,
                        curLoginTime: Date.now(),
                    }
                } else {
                    obj = {
                        lastLoginTime: Date.now(),
                        curLoginTime: Date.now(),
                    }
                }
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('token', res.data['token']);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('time', JSON.stringify(obj));
                res.data.outfit && init(res.data.outfit);
                
                setTimeout(() => {
                    navigate('/');
                    changeState(true);
                }, 1500);
            } else {
                message.error(res.message);
            }
        })
    };

    const register = (params: ILoginParams) => {
        registerApi({
        username: params.username,
        password: params.password
        }).then(result => {
            const res = result as any;
            if (res.errCode === 0) {
                message.success(res.message);
            setTimeout(() => {
                changeView();
            }, 1500);
        }else{
            message.error(res.message);
        }
        })
    };

    const changeView = () => {
        setShow(!show);
    }

  return (
      <div className="site">
        <div className="hero">
            <h1>WELCOME</h1>
        </div>
        <div className="container">
            <div className="login">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={show ? register : login}
                    autoComplete="off"
                >
                        <Form.Item
                            name="username"
                            className='input'
                            rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                            ]}
                        >
                            <Input size="large" prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className='input'
                            rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
                        </Form.Item>
            
                        {show&&<Form.Item
                            name="confirm"
                            className='input'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: '请再次确认密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请输入相同密码！'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请再次确认密码" />
                        </Form.Item>}

                    <Form.Item>
                        <Button size='large'
                        style={{
                            background: '#6a9e9c',
                            color: '#e2f5f5',
                            outline: 'none',
                            border:'none',
                        }} htmlType="submit" block>{show ? ' 注册 ':'登录'}</Button>
                    </Form.Item>
                    <Form.Item>
                        <div onClick={changeView} className='switch'>{show?'已有账号？前往登录':'还没账号？立即注册'}</div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
  );
}

export default Login;
