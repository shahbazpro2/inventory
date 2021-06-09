import {useState,useEffect} from 'react'
import axios from 'axios'
import { getSummary } from '../configurations/urls'
import TableComp from './TableComp';

const SummaryTable = ({data}) => {
    const [tbData,setTbData]=useState([])
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        getTbData()
    },[data])
    const getTbData=async ()=>{
        setLoading(true)
        let arr=[]
        for (const d of data){
            console.log('d',d)
           const res=await axios.get(`${getSummary}${d.dealer_id}/`)
                arr.push({ 
                    dealerName:d.dealer_name,
                    dealerId:d.dealer_id,
                    last_24_hours_new:res.data.last_24_hours.new,
                    last_24_hours_used:res.data.last_24_hours.used,
                    last_24_hours_total:res.data.last_24_hours.total,
                    last_7_days_new:res.data.last_7_days.new,
                    last_7_days_used:res.data.last_7_days.used,
                    last_7_days_total:res.data.last_7_days.total,
                    last_30_days_new:res.data.last_30_days.new,
                    last_30_days_used:res.data.last_30_days.used,
                    last_30_days_total:res.data.last_30_days.total,
                    lifetime_new:res.data.lifetime.new,
                    lifetime_used:res.data.lifetime.used,
                    lifetime_total:res.data.lifetime.total})
        }
    
    setTbData(arr)
        setLoading(false)

    }
   const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client_name',
            key: 'client_name',
            render: (image, record, index) => {
                return <span>{record.dealerName}</span>

            }

        },{
            title: 'Client Id',
            dataIndex: 'client_id',
            key: 'client_id',
            render: (image, record, index) => {
                return <span>{record.dealerId}</span>

            }

        },{
            title: 'last_24_hours_new',
            dataIndex: 'last_24_hours_new',
            key: 'last_24_hours_new',
        },{
            title: 'last_24_hours_used',
            dataIndex: 'last_24_hours_used',
            key: 'last_24_hours_used',
        },{
            title: 'last_24_hours_total',
            dataIndex: 'last_24_hours_total',
            key: 'last_24_hours_total',
        },{
            title: 'last_7_days_new',
            dataIndex: 'last_7_days_new',
            key: 'last_7_days_new',
        },{
            title: 'last_7_days_used',
            dataIndex: 'last_7_days_used',
            key: 'last_7_days_used',
        },{
            title: 'last_7_days_total',
            dataIndex: 'last_7_days_total',
            key: 'last_7_days_total',
        },{
            title: 'last_30_days_new',
            dataIndex: 'last_30_days_new',
            key: 'last_30_days_new',
        },{
            title: 'last_30_days_used',
            dataIndex: 'last_30_days_used',
            key: 'last_30_days_used',
        },{
            title: 'last_30_days_total',
            dataIndex: 'last_30_days_total',
            key: 'last_30_days_total',
        },{
            title: 'lifetime_new',
            dataIndex: 'lifetime_new',
            key: 'lifetime_new',
        },{
            title: 'lifetime_used',
            dataIndex: 'lifetime_used',
            key: 'lifetime_used',
        },{
            title: 'lifetime_total',
            dataIndex: 'lifetime_total',
            key: 'lifetime_total',
        }
    ];

    return (
        <div>
            <TableComp columns={columns} dataSource={tbData} loading={loading} />
        </div>
    )
}

export default SummaryTable
