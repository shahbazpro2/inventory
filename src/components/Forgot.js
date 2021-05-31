import React,{useState} from 'react'
import { Form, Input, Button } from 'antd'
import Navbar from './Navbar';
import { forgotPassURL } from '../configurations/urls';
import axios from 'axios';
import CheckMail from './CheckMail';

const Forgot = () => {
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
    const onFinish = (values) => {
        axios.post(forgotPassURL, { email: values.email })
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                if(err.response)
                setError(err.response.data[0])
                else
                setError('There is something wrong')
               
            })
    }
    return (
        <>
            <Navbar />
            <div className="container py-5">
            {success?
            <CheckMail forgot={true} />:
                <div className="row py-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="box">
                            <Form onFinish={onFinish}>
                                <h5 className="mb-4">Forgot Password</h5>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                </Button>
                                {error &&  <span className="ml-3" style={{ color: 'red' }}>{error}</span>}
                                </Form.Item>
                                
                            </Form>
                        </div>
                    </div>
                </div>
}
            </div>
        </>
    )
}

export default Forgot
