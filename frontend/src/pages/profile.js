import React, { useEffect, useState } from 'react'
import { useAuth } from '../functions/auth/authContext'
import axios from 'axios'
import '../css/pages/profile.scss'
import TopBar from '../components/topBar'
import { Link } from 'react-router-dom'

function Profile() {

  const {logout, user, token, userEmail} = useAuth()
  const [userInfos, setUserInfos] = useState(null)

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/userinfos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(res => {
        res.data.forEach(user => {
          if(user.email === userEmail)
            setUserInfos(user)
        });

      })
      .catch(err => {
        console.error('Error fetching user info', err)
      })
    }
  }, [token])

  useEffect(() => {
    if (userInfos) {
      user(userInfos)
    }
  }, [userInfos])



  return (
    <div className='userInfos-container'>

      <div className="topBar">
        <TopBar onclick={() => logout()}/>
      </div>

      <div className='page-title'>
        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>
      </div>


      <div className="profile-container">
        <div className="profile-header">
          <div className="title">
            <h2>Profile</h2>
            <p>Some infos may be visible to other people</p>
          </div>
          <Link to= '/profile/edit' className="edit-button">
            Edit
          </Link>
        </div>

        <div className="infos-list">
          <div className="info">
            <h4>Photo</h4>
            <img src={userInfos && (`http://localhost:5000${userInfos.photo}`)} alt='profile-picture' />
          </div>
          <div className="info">
            <h4>pseudo</h4>
            <p>{userInfos && (userInfos.pseudo)}</p>
          </div>
          <div className="info">
            <h4>Phone</h4>
            <p>{userInfos && (userInfos.phone)}</p>
          </div>
          <div className="info">
            <h4>Email</h4>
            <p>{userInfos && (userInfos.email)}</p>
          </div>
          <div className="info">
            <h4>Password</h4>
            <p>********</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
