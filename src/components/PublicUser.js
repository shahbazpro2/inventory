import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    UploadOutlined,
    FundViewOutlined,
    SettingOutlined
} from '@ant-design/icons'
import ListUsers from './ListUsers';
import Summary from './Summary';
import Settings from './Settings';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../configurations/urls';
import axios from 'axios'
import setAuthToken from './../utils/setAuthToken';

const { Header, Sider, Content } = Layout;
const PublicUser = ({ history }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState('1');

    useEffect(() => {
        console.log('check token')
        const { access, refresh } = JSON.parse(localStorage.getItem('userCreds'))
        console.log('access', access)
        const decoded = jwtDecode(access)
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            axios.post(refreshToken, { refresh: refresh })
                .then(res => {
                    const userCreds = {
                        access: res.data.access,
                        refresh: refresh
                    }
                    localStorage.setItem('userCreds', JSON.stringify(userCreds))
                    setAuthToken(res.data.access)
                })
                .catch(err => {
                    console.log(err)
                    dispatch(logoutUser())
                    window.location.replace('/login')
                })
        }
    }, [active])

    useEffect(() => {
        if(user.user.is_admin===true){
            history.push('/')
        }
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        setActive(e.key)
    }
    const showContent = () => {
        if (active === '1') {
            return <ListUsers  user={user.user} />
        } else if (active === '2') {
            return <Summary />
        }
        else if (active === '3') {
            return <Settings active={active} />
        }
        else if (active === '4') {
            dispatch(logoutUser())
            window.location.replace('/login')
        }
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    {!collapsed &&<div>
                            <div>
                            <small className="text-white mb-0">{user.user.dealer_name}</small>
                            </div>
                        <div>
                        <small className="text-white mb-0">{user.user.dealer_id}</small>
                        </div>
                        
                    </div> }
                </div>
                <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Inventory Lists
            </Menu.Item>
                    <Menu.Item key="2" icon={<FundViewOutlined />}>
                        View Summary
            </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>
                        Settings
            </Menu.Item>
                    <Menu.Item key="4" icon={<UploadOutlined />}>
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
        </Layout >
    )
}

export default withRouter(PublicUser)
