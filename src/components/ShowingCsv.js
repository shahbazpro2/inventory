import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableColumn from './TableColumn';
import { adminLink, allProcessedData, imageLink } from './../configurations/urls';
import { useSelector, useDispatch } from 'react-redux';
import { setAllProcessedCsv } from '../redux/actions';
import { Menu, Tabs } from 'antd';
import { FileImageOutlined, FundOutlined, HddOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import ListUsers from './ListUsers';
import ClientTableColumn from './ClientTableColumn';
import InventoryImages from './InventoryImages';
const { TabPane } = Tabs;
const ShowingCsv = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [data, setData] = useState(user.allProcessedCsv)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (user.allProcessedCsv.length > 0) {
            setLoading(false)
        }
        /* axios.get(adminLink)
        .then(res=>console.log('aa',res.data))
        .catch(err=>console.log(err)) */
        axios.get(allProcessedData)
            .then(res => {
                setData(res.data)
                dispatch(setAllProcessedCsv(res.data))
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])


    const dataSource = () => {
        let arr = []
        data.length > 0 && data.forEach((d, i) => {
            if (d.images) {
                d.images.forEach(img => {
                    arr.push({ ...d, 'images': '', 'editted_image': `${imageLink}${img.editted_image}`, 'original_image': `${imageLink}${img.original_image}`, 'processed_image': `${imageLink}${img.processed_image}` })
                })
            } else {
                arr.push(d)
            }
        })
        return arr
    }
    return (
        <>
             <Tabs defaultActiveKey="client">
                <TabPane
                
                    tab={
                        <span>
                            <UnorderedListOutlined />
              Inventory Lists
            </span>
                    }
                   
                    key="inventory"
                >
                   <TableColumn dataSource={dataSource()} user={user} loading={loading} />
                </TabPane>
                <TabPane
                
                    tab={
                        <span>
                            <UserOutlined />
              ListUsers
            </span>
                    }
                   
                    key="listusers"
                >
                 <ClientTableColumn dataSource={[]} />
                </TabPane>
                <TabPane
                
                tab={
                    <span>
                        <FileImageOutlined /> 
          Inventory Images
        </span>
                }
               
                key="inventoryimages"
            >
             <InventoryImages dataSource={dataSource()} />
            </TabPane>
            </Tabs>

        </>

    )
}

export default ShowingCsv
