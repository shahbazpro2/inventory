import { useState, useEffect } from 'react'
import TableColumn from './TableColumn';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { FileImageOutlined, FundOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import ClientTableColumn from './ClientTableColumn';
import InventoryImages from './InventoryImages';
import { useLocation,useHistory } from 'react-router-dom';
import SummaryTable from './SummaryTable';
const { TabPane } = Tabs;
const ShowingCsv = ({ data, loading, users, loadingUsers }) => {
    const user = useSelector(state => state.user)
    const [active, setActive] = useState(null);
    const [fetch, setFetch] = useState(false)
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
       console.log('pathname',pathname)
       setActive(pathname.replace('/',""))
    }, [pathname])

    const changeTab=(tab)=>{
        history.push(`/${tab}`)
        setActive(tab)
    }
    return (
        <>
            <Tabs defaultActiveKey="client" activeKey={active} onChange={changeTab}>
                <TabPane

                    tab={
                        <span>
                            <UnorderedListOutlined />
              Inventory Lists
            </span>
                    }

                    key="inventory-list"
                >
                    {<TableColumn dataSource={data} setFetch={() => setFetch(true)} user={user} loading={loading} />}
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
                    {<ClientTableColumn dataSource={users} loading={loadingUsers} />}
                </TabPane>
                <TabPane

                    tab={
                        <span>
                            <FileImageOutlined />
          Inventory Images
        </span>
                    }

                    key="inventory-images"
                >
                    <InventoryImages dataSource={data} loading={loading} setFetch={() => setFetch(true)} link="/inventory-images" />
                </TabPane>
                <TabPane

                    tab={
                        <span>
                            <FundOutlined />
          Summary
        </span>
                    }

                    key="inventory-summary"
                >
                    <SummaryTable data={users} />
                </TabPane>
            </Tabs>

        </>

    )
}

export default ShowingCsv
