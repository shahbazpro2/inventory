import React from 'react'
import { Button } from 'antd';

const CheckMail = ({reSendEmail,forgot}) => {
    console.log('for',forgot)
    return (
        <div className="mt-3">
            {forgot?
            <div>
              <p className="text-success">
                                Please check you e-mail and proceed from the link sent to you
                                    </p>
                            
                                <Button type="primary" onClick={()=>window.location.replace('/login')}>
                                    Login
                                    </Button>
                                    </div>:
                                     <div>
                                     <p className="text-success">
                                                       Registration Successful. Please check you e-mail and proceed from the link sent to you
                                                           </p>
                                                   
                                                       <Button type="primary" onClick={reSendEmail}>
                                                           Resend Email
                                                           </Button>
                                                           </div>
}
        </div>
    )
}

export default CheckMail
