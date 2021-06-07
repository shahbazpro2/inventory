import React, { useState, useEffect, useCallback } from 'react'
import ImageViewer from './ImageViewer';
import { Spin } from 'antd';

const InventoryImages = (props) => {
    const [imgGroup, setImgGroup] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentImage, setCurrentImage] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);


    useEffect(() => {
        console.log('called prop')
        const fimg = []
         props.dataSource.forEach(d => {
            fimg.push({ "img": d.original_image,type:'org', 'data': d })
            fimg.push({ "img": d.editted_image,type:'rem', 'data': d })
        })
        setImgGroup(fimg)
    }, [props.dataSource])

    useEffect(() => {
        imgGroup.length > 0 && setCurrentImage(imgGroup[currentIndex])
    }, [imgGroup, currentIndex])
    const openImageViewer = useCallback((index) => {
        setCurrentIndex(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(null);
        setCurrentIndex(0)
        setIsViewerOpen(false);
    };
    const changeFun = (val) => {
        console.log('v',val)
        if(val==='prev'){
            if((currentIndex-1)<0) return
            setCurrentIndex(currentIndex-1)
        }else if(val==='next'){
            if((currentIndex+1)>imgGroup.length) return
            setCurrentIndex(currentIndex+1)
        }
    }
   const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }
    return (
        <>

            {
                props.loading ? <div className="container">
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <Spin />
                    <h3 className="ml-3" style={{ zIndex: '222' }}>Loading data...</h3>
                </div>

            </div>:
            (isViewerOpen && currentImage!==null) && (
                <ImageViewer
                    current={currentImage}
                    currentIndex={currentIndex}
                    changeFun={changeFun}
                    onClose={closeImageViewer}
                    link={props.link}
                    setFetch={props.setFetch}
                />
            )}
            <div style={{ maxHeight: '70vh', overflowY: 'scroll' }}>

                {imgGroup.map((src, index) => {
                    return  <img
                    src={src.img}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    style={{ margin: '2px',cursor:'pointer' }}
                    alt="" />
                })}


            </div>
        </>
    )
}

export default InventoryImages
