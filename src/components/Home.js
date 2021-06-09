import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, withRouter } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UnorderedListOutlined,
    UploadOutlined,
    ScissorOutlined,
    UserOutlined,
    FileImageOutlined,
    FundOutlined
} from '@ant-design/icons';
import ShowingCsv from './ShowingCsv';
import ManualCutout from './ManualCutout';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { adminLink, allProcessedData } from '../configurations/urls';
import axios from 'axios'
import ClientTableColumn from './ClientTableColumn';
import { imageLink } from './../configurations/urls';
import InventoryImages from './InventoryImages';
import SummaryTable from './SummaryTable';
const { Header, Sider, Content } = Layout;
const Home = (props) => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(true)
    const [loadingUsers, setLoadingUsers] = useState(true)
    const { pathname } = useLocation();
    const fetchUsers = () => {
        axios.get(adminLink)
            .then(res => {
                setLoadingUsers(false)
                setUsers(res.data)
            })
            .catch(err => {
                setLoadingUsers(false)
                console.log(err)
            })
    }
    const fetchImages = () => {

        axios.get(allProcessedData)
            .then(res => {
                console.log('pdata', dataSource(res.data))
                setData(dataSource(res.data))
                setLoading(false)
                //dispatch(setAllProcessedCsv(res.data))
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    const dataSource = (data) => {
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
    
    useEffect(() => {
        /* if (pathname === '/clients') {
            setActive('1')
        } else */
        fetchUsers()
        fetchImages()
        console.log('path',pathname)
        if(pathname==='/'){
            props.history.push('/inventory-list')
        }else
        setActive(pathname)
       
    }, [pathname])

    useEffect(() => {
        if (user.is_admin === false) {
            props.history.push('/public')
        }
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        console.log('e', e)
        /* if (e.key === '1') {
            props.history.push('/clients')
        } else */

         if (e.key === '/logout') {
            dispatch(logoutUser())
            window.location.replace('/login')
        }
        props.history.push(e.key)
    }
    const showContent = () => {
        /* if (active === '1') {

            return <ListUsers user={user} />
        } else  */
        console.log(active)
        if (active === '/inventory-list' || active === '/listusers' || active === '/inventory-images' || active === '/inventory-summary') {
            return <ShowingCsv data={data} users={users} loadingUsers={loadingUsers} loading={loading} />
        } else if (active === '/users') {
            return <ClientTableColumn dataSource={users} loadingUsers={loadingUsers} />
        } else if (active === '/images') {
            return <InventoryImages dataSource={data} link="/images" loading={loading} />
        } else if (active === '/cutout') {
            return <ManualCutout />
        } else if (active === '/admin-summary') {
            return <SummaryTable data={users} />
        }

    }
    return (
        <>
            {active !== null ?
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            {!collapsed && <div>
                                <div>
                                    <small className="text-white mb-0">{user && user.dealer_name}</small>
                                </div>
                                <div>
                                    <small className="text-white mb-0">{user && user.dealer_id}</small>
                                </div>

                            </div>}
                        </div>
                        <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={active}>
                            {/*  <Menu.Item key="1" icon={<TeamOutlined />}>
                                Clients
            </Menu.Item> */}
                            <Menu.Item key="/inventory-list" icon={<UnorderedListOutlined />}>
                                Inventory Lists
            </Menu.Item>
                            <Menu.Item key="/users" icon={<UserOutlined />}>
                                List Users
            </Menu.Item>
                            <Menu.Item key="/images" icon={<FileImageOutlined />}>
                                Inventory Images
            </Menu.Item>
                            <Menu.Item key="/cutout" icon={<ScissorOutlined />}>
                                Manual Cutout
            </Menu.Item>
                            <Menu.Item key="/admin-summary" icon={<FundOutlined />}>
                                Summary
            </Menu.Item>

                            <Menu.Item key="/logout" icon={<UploadOutlined />}>
                                Logout
            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                            })}
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: '100vh',

                            }}
                        >
                            {showContent()}


                        </Content>
                    </Layout>
                </Layout > : null}
        </>
    )
}

export default withRouter(Home)
