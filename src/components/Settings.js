import React, { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Button, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { adminLink, baseURLWithoutSlash, userPreferences } from '../configurations/urls';
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
const Settings = ({ active, id }) => {
    const user = useSelector(state => state.user.user)
    const [preview, setPreview] = useState({ newfile: '', usedfile: '' })
    const [stateFile, setStateFile] = useState({ newfile: '', usedfile: '' })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        if (id) {
            axios.get(`${adminLink}${id}/`)
                .then(async res => {
                    let data = { ...res.data, ...res.data.user_preferences }
                    setImageStates(data)
                })
                .catch(err => console.log(err))
        } else {
            axios.get(userPreferences)
                .then(async (res) => {
                    let data = { ...user, ...res.data }
                    setImageStates(data)
                })
                .catch(err => console.log(err))
        }

    }, [active])
    const setImageStates = async (data) => {
        form.setFieldsValue({ user: data })
        if(data.new_background_image&&data.used_background_image){
            setStateFile({
                newfile: await getFileFromUrl(`
            ${baseURLWithoutSlash}${data.new_background_image}`, 'newfile.jpg'),
                usedfile: await getFileFromUrl(`
            ${baseURLWithoutSlash}${data.used_background_image}`, 'usedfile.jpg')
            })
            setPreview({
                newfile: `
            ${baseURLWithoutSlash}${data.new_background_image}`, usedfile: `
            ${baseURLWithoutSlash}${data.used_background_image}`
            })
        }else if(data.new_background_image){
            setStateFile({
                newfile: await getFileFromUrl(`
            ${baseURLWithoutSlash}${data.new_background_image}`, 'newfile.jpg'),
               
            })
            setPreview({
                newfile: `
            ${baseURLWithoutSlash}${data.new_background_image}`
            })
        }else if(data.used_background_image){
            setStateFile({
                usedfile: await getFileFromUrl(`
            ${baseURLWithoutSlash}${data.used_background_image}`, 'usedfile.jpg')
            })
            setPreview({
             usedfile: `
            ${baseURLWithoutSlash}${data.used_background_image}`
            })
        }
        


        
    }
    async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
            type: response.headers.get('content-type') || defaultType,
        });
    }

    const onFinish = (values) => {
        setError(null)
        setLoading(true)
        values.user.new_enhance_all = true
        values.user.used_enhance_all = true
        const formData = new FormData()
        for (var key in values.user) {
            var value = values.user[key];
            formData.append(key, value)
        }
        /* formData.append('hello','hy') */
        formData.append('new_background_image', stateFile.newfile)
        formData.append('used_background_image', stateFile.usedfile)
        let put
        if (id) {
            put = axios.put(`${adminLink}${id}/`, formData)
        } else {
            put = axios.put(`${userPreferences}`, formData)
        }

        put.then(res => {
            setSuccess(true)
            setLoading(false)
            setTimeout(() => {
                setSuccess(null)
            }, 2000)

        })
            .catch(err => {
                setLoading(false)
                if(err.response)
                setError(err.response.data.message)
                else
                setError('There is something wrong')
            })
    };
    const customRequestFun = (options) => {
        const { onSuccess, file } = options;
        setStateFile({ ...stateFile, newfile: file })
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            setPreview({ ...preview, newfile: reader.result })
        };
        onSuccess(file)
    };
    const customRequestFun1 = (options) => {
        const { onSuccess, file } = options;
        setStateFile({ ...stateFile, usedfile: file })
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            setPreview({ ...preview, usedfile: reader.result })
        };
        onSuccess(file)
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
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="box">
                            <Form name="nest-messages" form={form} layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
                                <h5>Dealer Information</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'dealer_name']} label="Dealer Name">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'address']} label="Address">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'city']} label="City">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'phone']} label="Phone">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'state']} label="State">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'website']} label="Website">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'zip_code']} label="Zip">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <h5 className="mt-4">Exterior Background</h5>
                                <h6>New Vehicles</h6>
                                <Form.Item name={['user', 'new_num_images']} {...inputConfig} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'new_only_enhance_min_num']} {...inputConfig} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                {/* <Form.Item name={['user', 'new_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                    <Checkbox></Checkbox>
                                </Form.Item> */}
                                {/* <Form.Item name={['user', 'new_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item> */}
                                <Form.Item label="Upload background image">
                                    <div className="d-flex">
                                        <Upload customRequest={customRequestFun}>
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
                                {/* <Form.Item name={['user', 'used_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                    <Input type="checkbox" />
                                </Form.Item> */}
                                {/* <Form.Item name={['user', 'used_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item> */}
                                <Form.Item label="Upload background image">
                                    <div className="d-flex">
                                        <Upload customRequest={customRequestFun1}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                        <div className="ml-3">
                                            <Image
                                                width={80}
                                                src={preview.usedfile}
                                            />
                                        </div>
                                    </div>


                                </Form.Item>
                                <h6 className="pt-4">Notes/Comments:</h6>
                                <Form.Item name={['user', 'notes']} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <div className="d-flex">
                                        <Button type="primary" loading={loading} htmlType="submit">
                                            Update Info
                                </Button>
                                        {error && <p className="text-danger ml-3">
                                            {error}
                                        </p>}
                                        {success && <p className="text-success ml-3">
                                            Information Successfully Updated
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

export default React.memo(Settings)
