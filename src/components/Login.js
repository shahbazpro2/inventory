import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import Navbar from './Navbar';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { allUsersData, LOG_IN_JWT } from '../configurations/urls';
import setAuthToken from './../utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions';
import { getUserData } from './../configurations/urls';
import { setAllUsers } from './../redux/actions/index';

const Login = ({ user, history }) => {
    const [error, setError] = useState('')
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const userCreds = JSON.parse(localStorage.getItem('userCreds'))
        if (userCreds && userCreds.access) {
            history.push('/public')
        }
    })
    const onFinish = (values) => {
        setLoading(true)
        const userCreds = {
            email: values['email'],
            password: values['password']
        }

       
            axios.post(LOG_IN_JWT, userCreds)
                .then(res => {
                    localStorage.setItem('userCreds', JSON.stringify({
                        refresh: res.data.refresh,
                        access: res.data.access
                    }))
                    setAuthToken(res.data.access);
                    axios.get(getUserData)
                        .then(res => {
                            dispatch(setCurrentUser(res.data))
                            history.push('/')
                        }).catch(err => {
                            setLoading(false)
                            console.log(err)
                        })

                })
                .catch(err => {
                    if(err.response)
                    setError(err.response.data.detail)
                    else
                    setError('There is something wrong')
                    setLoading(false)
                })
        

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Navbar user={user} />
            <div className="container text-center">
                {user === 'admin' ? <h3 className="mt-4">Admin login</h3> : <h3 className="mt-4">Public Login</h3>}
                <div className="row pt-3 justify-content-center">

                    <div className="col-md-6">
                        <div className="box">
                            <Form
                                name="basic"
                                layout="vertical"
                                onChange={() => setError(null)}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please type your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please type your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>



                                <Form.Item>
                                    <Button type="primary" loading={loading} htmlType="submit">
                                        Login
                                    </Button>
                                    <Link to="/forgot" className="m-3">Forgot password</Link>
                                </Form.Item>
                                {error && <span style={{ color: 'red' }}>{error}</span>}
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login)
