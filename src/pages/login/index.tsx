import { ILoginParams, loginApi, registerApi } from '@/src/request/api';
import { useGlobalStore } from '@/src/store/useGlobalStore';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './index.scss';
import { useOutfitStore } from '@/src/store/useOutfitStore';
import gsap from "gsap";

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { changeState } = useGlobalStore();
    const [loading, setLoading] = useState(false);
    const { reset } = useOutfitStore();

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
                reset();
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
            if (data.message === '注册成功') {
                message.success(data.message);
                setTimeout(() => {
                    changeView();
                }, 1500);
            } else {
                message.error(data.message);
            }
        }).finally(() => {
            setLoading(false);
        })
    };

    const changeView = () => {
        setShow(!show);
    }

    useLayoutEffect(() => {
        gsap.to('.login-container', {
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut',
        });
    }, [])

    return (
        <div className="login-container">
            <div className="bubble" style={{ left: 5, animationDelay: '-3s' }} />
            <div className="bubble small_size " style={{ left: 650 }} />
            <div className="bubble large_size" style={{ left: 1100, animationDelay: '-5s' }} />
            <div className="login-wrapper">
                <div className="login">
                    <div className='login-title'>
                        {show ? ' Create An Account' : 'Sign In'}
                    </div>
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
                                    message: 'Please enter the username!',
                                },
                            ]}
                        >
                            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className='input'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        {show && <Form.Item
                            name="confirm"
                            className='input'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password again!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please enter the same password!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please confirm the password again" />
                        </Form.Item>}

                        <Form.Item>
                            <Button size='large'
                                style={{
                                    background: '#26655e',
                                    color: '#e2f5f5',
                                    outline: 'none',
                                    border: 'none',
                                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
                                }}
                                htmlType="submit" block>
                                {show ? ' Sign Up ' : 'Login'}
                                {loading && <LoadingOutlined style={{ position: 'absolute', right: '100px', fontSize: '22px', color: '#fff' }} />}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <div onClick={changeView} className='switch'>
                                {show ? 'Already Have An Account?Sign In' : 'Dont Have An Account?Sign Up'}
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
