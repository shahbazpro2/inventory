import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import axios from 'axios'
import { getSummary } from './../configurations/urls';
import { useSelector } from 'react-redux';

const Summary = ({active}) => {
    const user=useSelector(state=>state.user.user)
    const [data,setData]=useState([])
    useEffect(()=>{
        console.log('w',user)
        axios.get(`${getSummary}${user.dealer_id}/`)
        .then(res=>{
            console.log('data',res.data)
            setData(res.data)})
        .catch(err=>console.log(err))
    },[active])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <Card title="Lifetime" style={{ width: '100%' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <div>New</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.lifetime && data.lifetime.new}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Used</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.lifetime && data.lifetime.used}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Total</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.lifetime && data.lifetime.total}</h6>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card title="Last_24_hours" style={{ width: '100%' }}>
                    <div className="row">
                            <div className="col-md-6">
                                <div>New</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_24_hours && data.last_24_hours.new}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Used</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_24_hours && data.last_24_hours.used}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Total</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_24_hours && data.last_24_hours.total}</h6>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card title="Last_7_days" style={{ width: '100%' }}>
                    <div className="row">
                            <div className="col-md-6">
                                <div>New</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_7_days && data.last_7_days.new}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Used</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_7_days && data.last_7_days.used}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Total</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_7_days && data.last_7_days.total}</h6>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card title="Last_30_days" style={{ width: '100%' }}>
                    <div className="row">
                            <div className="col-md-6">
                                <div>New</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_30_days && data.last_30_days.new}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Used</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_30_days && data.last_30_days.used}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>Total</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h6>{data.last_30_days && data.last_30_days.total}</h6>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default Summary
