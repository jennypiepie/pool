import { ILoginParams, loginApi, registerApi } from '@/src/request/api';
import { useGlobalStore } from '@/src/store/useGlobalStore';
import { LockOutlined, UserOutlined,LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import './index.scss';


function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { changeState } = useGlobalStore();
    const [loading, setLoading] = useState(false);

    const login = (params: ILoginParams) => {
        setLoading(true);
        loginApi({
            username: params.username,
            password: params.password,
        }).then(result => {
            const data = result.data;
            if (data.username) {
                message.success(data.message);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('outfit', data.outfit);
                localStorage.setItem('time', Date.now().toString());
                setTimeout(() => {
                    navigate('/');
                    changeState(true);
                }, 1500);
            } else {
                message.error(data.message);
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    };

    const register = (params: ILoginParams) => {
        setLoading(true);
        registerApi({
        username: params.username,
        password: params.password
        }).then(result => {
            const data = result.data;
            if (data.message==='注册成功') {
                message.success(data.message);
            setTimeout(() => {
                changeView();
            }, 1500);
            }else{
                message.error(data.message);
            }
        }).finally(() => {
            setLoading(false);
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
          <div className="bubble" style={{left:5,animationDelay: '-3s'}}/>
          <div className="bubble small_size " style={{left:650}}/>
          <div className="bubble large_size" style={{left:1100,animationDelay: '-5s'}}/>
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
                            background: '#6a949e',
                            color: '#e2f5f5',
                            outline: 'none',
                            border: 'none',
                            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
                        }}
                        htmlType="submit" block>
                            {show ? ' 注册 ' : '登录'}
                            {loading&&<LoadingOutlined style={{ position:'absolute',right:'100px', fontSize: '22px',color: '#fff' }} />}
                        </Button>
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
