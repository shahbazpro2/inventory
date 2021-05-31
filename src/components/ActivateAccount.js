import React from 'react'
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { activationURL } from '../configurations/urls';
import axios from 'axios';

const ActivateAccount = () => {
    const { uid, token } = useParams();
    const sendActivation = () => {
        console.log("Activation is beign sent");
        axios.post(activationURL, { uid, token })
            .then(res => {
                console.log("Activation Complete....")
                window.location.replace('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row py-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="box">
                            <h3>Press To Activate Account</h3>
                            <Button type="primary" onClick={sendActivation}>
                                Activate Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivateAccount;
