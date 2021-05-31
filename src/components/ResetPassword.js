import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import Navbar from './Navbar';
import { withRouter,useParams } from 'react-router-dom';
import axios from 'axios';
import { LOG_IN_JWT } from '../configurations/urls';
import { createNewPassword } from './../configurations/urls';

const ResetPassword = ({ user, history }) => {
    const [error, setError] = useState('')
    const { uid, token } = useParams();

    useEffect(() => {
        const userCreds = JSON.parse(localStorage.getItem('userCreds'))
        if (userCreds && userCreds.access) {
            history.push('/public')
        }
    })
    const onFinish = (values) => {
        console.log('values', values)
        axios.post(createNewPassword, { uid, token, new_password: values.password, re_new_password: values.confirm })
            .then(res => {
                
                history.push('/login')
            })
            .catch(err => setError(true))
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Navbar user={user} />
            <div className="container text-center">
                <h3 className="mt-4">Create new Passoword</h3>
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
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please type your new password!',
                                            
                                        },
                                        { min: 8, message: 'Password must be minimum 8 characters.' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>



                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Create
                                    </Button>
                                </Form.Item>
                                {error && <span className="ml-3" style={{ color: 'red' }}>There is something wrong</span>}
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(ResetPassword)
