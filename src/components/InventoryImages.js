import React, { useState, useEffect, useCallback } from 'react'
import ImageViewer from './ImageViewer';

const InventoryImages = (props) => {
    const [imgGroup, setImgGroup] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentImage, setCurrentImage] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
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
       
        
        if(val==='prev'){
            if((currentIndex-1)<0) return
            setCurrentIndex(currentIndex-1)
        }else if(val==='next'){
            if((currentIndex+1)>imgGroup.length) return
            setCurrentIndex(currentIndex+1)
        }
    }
    return (
        <>
            {(isViewerOpen && currentImage!==null) && (
                <ImageViewer
                    current={currentImage}
                    currentIndex={currentImage}
                    changeFun={changeFun}
                    onClose={closeImageViewer}
                />
            )}
            <div style={{ maxHeight: '70vh', overflowY: 'scroll' }}>

                {imgGroup.map((src, index) => (
                    <img
                        src={src.img}
                        onClick={() => openImageViewer(index)}
                        width="300"
                        key={index}
                        style={{ margin: '2px',cursor:'pointer' }}
                        alt="" />
                ))}


                {/* <Image.PreviewGroup >
     {imgGroup.map(data=>{
      return <Image
      preview={{
        onVisibleChange: (prev, curr) => console.log(prev, curr)
      }}
        onClick={()=>imgFun(data)}
        key={data.img}
        width={200}
        src={data.img}
      />
     })}
      
    </Image.PreviewGroup> */}
            </div>
        </>
    )
}

export default InventoryImages
