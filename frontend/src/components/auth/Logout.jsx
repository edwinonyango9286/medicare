import Base from '../Base'
import { useEffect } from 'react'
import { UserLogout } from '../../libs/user'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        UserLogout();
        navigate("/auth-user-login")
    },[])
  return (
    <Base>
        <div>Loging Out....</div>
    </Base>
  )
}

export default Logout