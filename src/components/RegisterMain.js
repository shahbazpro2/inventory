import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import Navbar from './Navbar';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { userCreateEndPoint, reSendEmailURL } from '../configurations/urls';
import CheckMail from './CheckMail';
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


function RegisterMain() {
    const [message, setMessage] = useState('')
    const [showMessage, setshowMessage] = useState(false);
    const [email, setEmail] = useState('')
    const [loading,setLoading]=useState(false)
    const [success, setSuccess] = useState(null)


    const reSendEmail = () => {
        if (email) {
            console.log("Resending Email");
            axios.post(reSendEmailURL, { email })
                .then(res => {
                    setMessage("Email Sent")
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };
   
    const onFinish = (values) => {
        setLoading(true)
        console.log(values.user);
        const userData = {
            email: values.user["email"],
            dealer_name: values.user["dealerName"],
            dealer_id: values.user["dealerId"],
            address: values.user["address"],
            phone: values.user["phone"],
            state: values.user["state"],
            city: values.user["city"],
            zip_code: values.user["zipcode"],
            website: values.user["website"],
            password: values.user["password"],
            re_password: values.user["password"]
        };
        if (userData.email && userData.password) {
            axios.post(userCreateEndPoint, userData)
                .then(res => {
                    setLoading(false)
                    setSuccess(true)
                setTimeout(() => {
                    setSuccess(null)
                    window.location.replace('/login')
                }, 2000)
                   // setEmail(userData['email'])
                   
                })
                .catch(err => {
                    setLoading(false)
                    if(!err.response){
                        setMessage('There is something wrong') 
                    }else if(err.response.data.dealer_id){
                        setMessage(err.response.data.dealer_id[0]) 
                    }else if(err.response.data.email){
                        setMessage(err.response.data.email[0]) 
                    }
                    
                    setshowMessage(true);
                    
                })
        }
    };
 
      const inputConfig = {
        rules: [
          {
            required: true,
            message: 'Please input this field!',
          },
        ],
      };
      const passwordConfig={
          rules:[
              {required:true,message:'Please input this field'},
              { min: 8, message: 'Password must be minimum 8 characters.' }
          ]
      }
      const emailConfig={
        rules: [
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
      }

    return (
        <>
            <Navbar />
            
            <div className="container py-2">
            {email?<CheckMail reSendEmail={reSendEmail} />:
                <div className="row py-5 justify-content-center">
                    <div className="col-md-8">
                        <div className="box">
                            <Form name="nest-messages" layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
                                <h5>Dealer Personal Information</h5>
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'dealerName']} label="Dealer Name" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'dealerId']} label="Dealer Id" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'email']} label="Email" {...emailConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'password']} label="Password" {...passwordConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'phone']} label="Phone" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'state']} label="State" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'city']} label="City" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'zipcode']} label="Zip" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                        <Form.Item name={['user', 'address']} label="Address" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'website']} label="Website" {...inputConfig}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item>
                                    <Button type="primary" loading={loading} htmlType="submit">
                                        Create Account
                                    </Button>
                                    {showMessage &&
                                    <span className="ml-3" style={{ color: 'red' }}>{message}</span>
                                    
                                }
                                  {success && <p className="text-success ml-3">
                                    Information Successfully Submitted
                                    </p>}
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

export default withRouter(RegisterMain);
