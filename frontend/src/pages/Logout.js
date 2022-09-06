import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Helper/AuthProvider'

function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        auth.LoginUsername(null);
        auth.LoginName(null);
        auth.LoginEmail(null);
        navigate('/login')
    })
    
    return (
    <div>

    </div>
  )
}

export default Logout