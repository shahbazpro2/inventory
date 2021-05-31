import React from 'react'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { sendToEditor } from './../Actions/index';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { baseURL } from '../configurations/urls';
const { Dragger } = Upload;



const ManualCutout = (props) => {
    const dispatch = useDispatch()
   
    const uploadImage = (options) => {
        const { onSuccess, file } = options;
        const formData=new FormData()
        formData.append('image',file)
        axios.post(`${baseURL}bgremove/result/`, formData)
            .then(res => {
                
                 dispatch(sendToEditor({ orignalImage: `data:image/png;base64,${res.data.original}`, removedImage: `data:image/png;base64,${res.data.image_data}`,link:props.location.pathname }))
                props.history.push('/editor') 
                onSuccess(file)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="manual">
                    <Dragger customRequest={uploadImage}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(connect(null, { sendToEditor })(ManualCutout))





