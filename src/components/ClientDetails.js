import {useEffect,useState} from 'react'
import axios from 'axios'
import { adminLink } from '../configurations/urls'
import ClientTableColumn from './ClientTableColumn'

const ClientDetails = ({id}) => {
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get(`${adminLink}${id}/`)
        .then(res=>{
            
            let arr=[]
            arr.push(res.data)
            setData(arr)})
        .catch(err=>console.log(err))
    },[])
    return (
        <div>
            <ClientTableColumn dataSource={data}/>
        </div>
    )
}

export default ClientDetails
