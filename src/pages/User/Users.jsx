import React, { useState } from 'react'
import user_img from '../../assets/images/user_img.png'
import './Users.scss'
import { auth } from '../../api/firebase'
const Users = () => {
    const [user, setUser] = useState('')
    auth.onAuthStateChanged((user)=>{
        setUser(user)
    })
  return (
    <div className='main_users'>
      <div className='user_card'>
        <img src={user?.photoURL} alt="" className='user_card_img' />
        <span>{user?.displayName}</span>
      </div>
    </div>
  )
}

export default Users
