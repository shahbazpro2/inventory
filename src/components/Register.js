import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Upload, Image, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { userPreferences } from '../configurations/urls';

const Register = (props) => {
    const [preview,setPreview]=useState({newfile:'',oldfile:''})
    const [stateFile,setStateFile]=useState({newfile:'',oldfile:''})
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading,setLoading]=useState(false)
    const onFinish = (values) => {
        setError(null)
        setLoading(true)
        if(values.user.new_enhance_all===undefined){
            values.user.new_enhance_all=false
        }
        if(values.user.used_enhance_all===undefined){
            values.user.used_enhance_all=false
        }
        const formData = new FormData()
        for (var key in values.user) {
            var value = values.user[key];
            formData.append(key, value)
        }
       
        formData.append('new_background_image', stateFile.newfile)
        formData.append('used_background_image', stateFile.oldfile)
        axios.post(userPreferences, formData)
            .then(res => {
                setLoading(false)
                console.log(res.data)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(null)
                    window.location.replace('/public')
                }, 2000)
                //props.history.push('/')
            })
            .catch(err => {
                setLoading(false)
                if(err.response)
                setError(err.response.data.message)
                else
                setError('There is something wrong')
                console.log(err.response.data.message)}) 
    };
    const inputConfig = {
        rules: [
          {
            required: true,
            message: 'Please input this field!',
          },
        ],
      };
      const dateConfig = {
        rules: [
          {
            required: true,
            message: 'Please select time!',
          },
        ],
      };
      
      const uploadConfig = {
        rules: [
          {
            required: true,
            message: 'Please upload file!',
          },
        ],
      };
    const customRequestFun = (options) => {
        const { onSuccess, file } = options;
        setStateFile({...stateFile,newfile:file})
        let reader = new FileReader();

        reader.readAsDataURL(file);
      
        reader.onload = function() {
          setPreview({...preview,newfile:reader.result})
        };
              onSuccess(file)
    };
    const customRequestFun1 = (options) => {
        const { onSuccess, file } = options;
        setStateFile({...stateFile,oldfile:file})
        let reader = new FileReader();

        reader.readAsDataURL(file);
      
        reader.onload = function() {
          setPreview({...preview,oldfile:reader.result})
        };
        onSuccess(file)
    };

    return (
        <>
            <Navbar />
            <div className="container py-2">
                <div className="row py-5 justify-content-center">
                    <div className="col-md-8">
                        <div className="box">
                            <Form name="nest-messages" layout="horizontal" onFinish={onFinish} >
                                <h5 className="mt-4">Exterior Background</h5>
                                <h6>New Vehicles</h6>
                                <Form.Item name={['user', 'new_num_images']}  {...inputConfig} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'new_only_enhance_min_num']} {...inputConfig} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name={['user', 'new_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                <Checkbox></Checkbox>
                                </Form.Item>
                                <Form.Item name={['user', 'new_enhance_after']} {...dateConfig} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'}  />
                                </Form.Item>
                                <Form.Item label="Upload background image">
                                <div className="d-flex">
                                    <Upload customRequest={customRequestFun} {...uploadConfig}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    <div className="ml-3">
                                    <Image
                                        width={80}
                                        src={preview.newfile}
                                    />
                                    </div>
                                    
                                    </div>
                                </Form.Item>
                                <h6 className="pt-4">Used Vehicles</h6>
                                <Form.Item name={['user', 'used_num_images']} {...inputConfig} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'used_only_enhance_min_num']} {...inputConfig} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name={['user', 'used_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                <Checkbox></Checkbox>
                                </Form.Item>
                                <Form.Item name={['user', 'used_enhance_after']} {...dateConfig} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item>
                                <Form.Item label="Upload background image">
                                <div className="d-flex">
                                    <Upload customRequest={customRequestFun1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    <div className="ml-3">
                                    <Image
                                        width={80}
                                        src={preview.oldfile}
                                    />
                                    </div>
                                    </div>
                                </Form.Item>
                                <h6 className="pt-4">Notes/Comments:</h6>
                                <Form.Item name={['user', 'notes']} {...inputConfig} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <div className="d-flex">
                                    <Button type="primary" loading={loading} htmlType="submit">
                                        Save Info
                                </Button>
                                {error && <p className="text-danger ml-3">
                                    {error}
                                    </p>}
                                {success && <p className="text-success ml-3">
                                    Information Successfully Submitted
                                    </p>}
                                    </div>
                                   
                                </Form.Item>
                              
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Register)
