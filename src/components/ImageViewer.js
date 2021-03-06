import { CloseOutlined, LeftCircleFilled, RightCircleFilled, UploadOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Spin, Upload, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { sendToEditor } from './../Actions/index';
import { withRouter } from 'react-router-dom';
import { saveProcessedImage } from './../configurations/urls';
import { triggerBase64Download } from 'react-base64-downloader';

const ImageViewer = ({ current, changeFun, onClose, history,link,setFetch }) => {
    const [loading, setLoading] = useState(false)
    const [pending,setPending]=useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        document.addEventListener('keydown', function(event){
            if(event.keyCode===39){
                changeFun('next')
            }else if(event.keyCode===37){
                changeFun('prev')
            }
            console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
        })
    },[])

    const openEditor = async (a) => {
        let image = await axios.get(`${a.original_image}`, { responseType: 'arraybuffer' });
        let orignal = Buffer.from(image.data).toString('base64');
        image = await axios.get(`${a.processed_image}`, { responseType: 'arraybuffer' })
        let processed = Buffer.from(image.data).toString('base64')

        dispatch(sendToEditor({ orignalImage: `data:image/png;base64,${orignal}`, removedImage: `data:image/png;base64,${processed}`, link:link, imgName: a.processed_image.split("/")[8], dealerId: a.owner }))
        history.push('/editor')

    }
    const openEdit = (data) => {
        openEditor(data)
        setLoading(true)
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const uploadImage = async(options) => {
        setPending('upload')
        const {file}=options
        let b64 = await toBase64(file)
        b64 = b64.replace('data:image/png;base64,', '')
        axios.post(`${saveProcessedImage}${current.data.processed_image.split("/")[8]}/${current.data.owner}/`, {image_data:b64})
            .then(res => {
                console.log('res',res.data)
                setFetch()
                setPending('')
                onClose()
                window.location.reload()
                

            })
            .catch(err => {
                console.log(err)
                setPending('')
            })
    }
    function toDataUrl(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    const download=()=>{
        setPending('download')
        console.log('download')
        toDataUrl(current.data.processed_image, function(myBase64) {
            triggerBase64Download(myBase64, 'background-removal-edit');
            setPending('')
        });
        
    }
    return (
        <div className="img-viewer">
            <div className="overlay"></div>
            {loading ? <div className="container">
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <Spin />
                    <h3 className="ml-3 text-white" style={{ zIndex: '222' }}>Opening Editor please wait...</h3>
                </div>

            </div> :
                <>
                    <div className="close" onClick={onClose}>
                        <CloseOutlined />
                    </div>

                    <div className="arrows arrow-left" onClick={() => changeFun('prev')}>
                        <LeftCircleFilled />
                    </div>
                    <div className="topbar">
                        <div className="title">DealerId: {current.data.owner && current.data.owner}</div>
                    </div>

                    <img width="500" src={current.img} alt="img" />

                    <div className="arrows arrow-right" onClick={() => changeFun('next')}>
                        <RightCircleFilled />
                    </div>
                    {current.type === 'rem' && <div className="d-flex bottombar">
                        <button className="btm btn-sm btn-primary" onClick={() => openEdit(current.data)}>Edit</button>
                        <button className="btm btn-sm btn-success mx-3" disabled={pending==='download'} onClick={download}>Download</button>
                        <Upload
                            customRequest={uploadImage}
                            maxCount={1}
                            showUploadList={false}
                        >
                            <Button loading={pending==='upload'} icon={<UploadOutlined />}>Replace</Button>
                        </Upload>
                    </div>
                    }
                </>}
        </div>
    )
}

export default withRouter(ImageViewer)
