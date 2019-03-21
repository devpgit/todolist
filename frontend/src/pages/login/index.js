import React from 'react';
import {Button} from 'antd';
import './index.scss';

const login = () => {
    return(
        <div>
            <Button className='btn-login' type="primary" onClick={()=>{
                document.location.href = 'http://localhost:5000/api/auth/google'
            }}>Google 授權</Button>
        </div>
    )
}

export default login;