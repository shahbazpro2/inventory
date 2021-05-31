import React, { useState } from 'react'
import { Layout, Menu, Tabs } from 'antd';
import { withRouter, useParams } from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    UploadOutlined,
    RollbackOutlined,
    TableOutlined,
    SettingOutlined,
    FundOutlined,
    HddOutlined
} from '@ant-design/icons'
import ListUsers from './ListUsers';
import { useSelector, useDispatch } from 'react-redux';
import Settings from './Settings';
import { logoutUser } from '../redux/actions';
import Summary from './Summary';
import ClientDetails from './ClientDetails';
const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const SingleUser = ({ history }) => {
    const user = useSelector(state => state.user.user)
    const dispatch=useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState('client');
    const [activeTab,setActiveTab]=useState(1);
    let { id } = useParams()
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        setActive(e.key)
    }
    const setTabPane=(tab)=>{
        if(tab==='client')
        setActiveTab(true)
        else
        setActiveTab(false)
    }
    const showContent = () => {
        if (active === 'back') {
            history.push('/')
        } else if (active === 'client') {
            return <Tabs  onTabClick={setTabPane} defaultActiveKey="client">
                <TabPane
                
                    tab={
                        <span>
                            <TableOutlined />
              CSV Data
            </span>
                    }
                   
                    key="csv"
                >
                    <ListUsers id={id} user={user} />
                </TabPane>
                <TabPane
                
                    tab={
                        <span>
                            <HddOutlined />
              Details
            </span>
                    }
                   
                    key="details"
                >
                    <ClientDetails id={id}/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FundOutlined />
              Summary
            </span>
                    }
                    key="summary"
                >
                    <Summary active={activeTab} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <SettingOutlined />
              Settings
            </span>
                    }
                    key="setting"
                >
                    <Settings id={id} active={activeTab} />
                </TabPane>
               
            </Tabs>
        }
        else if (active === 'logout') {
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
                            <small className="text-white mb-0">{user && user.dealer_name}</small>
                            </div>
                        <div>
                        <small className="text-white mb-0">{user && user.dealer_id}</small>
                        </div>
                        
                    </div> }
                </div>
                <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={['client']}>
                    <Menu.Item key="back" icon={<RollbackOutlined />}>
                        Back
            </Menu.Item>
                    <Menu.Item key="client" icon={<UserOutlined />}>
                        Client
            </Menu.Item>
                    <Menu.Item key="logout" icon={<UploadOutlined />}>
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

export default withRouter(SingleUser)
