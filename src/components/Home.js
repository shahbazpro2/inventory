import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, withRouter } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UnorderedListOutlined,
    UploadOutlined,
    ScissorOutlined
} from '@ant-design/icons';
import ShowingCsv from './ShowingCsv';
import ManualCutout from './ManualCutout';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const { Header, Sider, Content } = Layout;
const Home = (props) => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState(null);
    const { pathname } = useLocation();
    useEffect(() => {
        /* if (pathname === '/clients') {
            setActive('1')
        } else */ 
        if (pathname === '/inventory-list') {
            setActive('1')
        } 
        else if (pathname === '/cutout') {
            setActive('2')
        } else {
            props.history.push('/inventory-list')
        }
    }, [pathname])

    useEffect(() => {
        if(user.is_admin===false){
            props.history.push('/public')
        }
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        /* if (e.key === '1') {
            props.history.push('/clients')
        } else */ 
        if (e.key === '1') {
            props.history.push('/inventory-list')
        } else if (e.key === '2') {
            props.history.push('/cutout')
        } else if (e.key === '3') {
            dispatch(logoutUser())
            window.location.replace('/login')
        }
    }
    const showContent = () => {
        /* if (active === '1') {

            return <ListUsers user={user} />
        } else  */
        if (active === '1') {
            return  <ShowingCsv />
                
                
            
        }
        else if (active === '2') {
            return <ManualCutout />
        }
    }
    return (
        <>
            {active !== null ?
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                    {!collapsed &&<div>
                            <div>
                            <small className="text-white mb-0">{user && user.dealer_name}</small>
                            </div>
                        <div>
                        <small className="text-white mb-0">{user && user.dealer_id}</small>
                        </div>
                        
                    </div> }
                </div>
                        <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={active}>
                           {/*  <Menu.Item key="1" icon={<TeamOutlined />}>
                                Clients
            </Menu.Item> */}
                            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                                Inventory Lists
            </Menu.Item>
                            
                            <Menu.Item key="2" icon={<ScissorOutlined />}>
                                Manual Cutout
            </Menu.Item>
                            <Menu.Item key="3" icon={<UploadOutlined />}>
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
                </Layout > : null }
        </>
    )
}

export default withRouter(Home)
