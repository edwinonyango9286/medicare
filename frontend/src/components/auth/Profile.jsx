import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { user_profile } from '../../query/user'

function Profile() {
    const [user,setUser] = useState({})
    const LoadUser = () =>{
        user_profile()
        .then(response => {
            setUser(response.data.user)
        })
    }

    useEffect(() => {
        LoadUser()
    },[])
  return (
    <Base>
        <div>
            {user?.username}
        </div>
    </Base>
  )
}

export default Profile