import React, { useState, useEffect, useRef } from 'react'
import '../css/pages/userEdit.scss'
import { useAuth } from '../functions/auth/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import ValidateButton from '../components/validateButton'
import axios from 'axios'
import TopBar from '../components/topBar'
import InputForm from '../components/auth/inputForm'
import { Link, useNavigate } from 'react-router-dom'

function UserEdit() {

  const navigate = useNavigate()

  const { token, userEmail } = useAuth()

  const [userInfos, setUserInfos] = useState(null)
  const [photoData, setPhotoData] = useState('')
  const [emailData, setEmailData] = useState('')
  const [phoneData, setPhoneData] = useState('')
  const [passwordData, setPasswordData] = useState('')

  const fileInputRef = useRef(null)


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
      setEmailData(userInfos.email || '')
      setPhoneData(userInfos.phone || '')
      setPhotoData(userInfos.photo || '')
    }
  }, [userInfos])

  const handleFileChange = (e) => {
    setPhotoData(e.target.files[0])
    console.log(e.target.files[0])
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const id = userInfos._id

    const formData = new FormData()
    formData.append('email', emailData)
    formData.append('phone', phoneData)
    formData.append('password', passwordData)

    if (photoData) {
      console.log(photoData)
      formData.append('photo', photoData)
    }

    axios.put(`http://localhost:5000/userinfos/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('User updated !')
      navigate('/profile')
    })
    .catch(err => {
      console.error('Error update user:', err)
    })
  }

  return (
    <div className='userEdit-container'>
      <TopBar />

    <div className="back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
      <Link to='/profile'>Back</Link>
    </div>

    <div className="content-container">

      <div className='page-title'>
        <h1>Change info</h1>
        <p>changes will be reflected to every services</p>
      </div>

      <div className="infos-list">

        <div className="info-image">

          <div className="profile-image">
            <FontAwesomeIcon className='icon-camera' icon={faCamera} />
            <img
              src={userInfos && (`http://localhost:5000${userInfos.photo}`)}
              alt='profile-picture' width='50px'
            />
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
          <p onClick={() => fileInputRef.current.click()}>Change photo</p>
        </div>

        <div className="info">
          <p>Email</p>
          <InputForm
            type='text'
            placeholder='Email@adress.com'
            value={emailData}
            onChange={(e) => setEmailData(e.target.value)}
            icon={faEnvelope}
          />
        </div>

        <div className="info">
          <p>Phone</p>
          <InputForm
            type='text'
            placeholder='0658741239'
            value={phoneData}
            onChange={(e) => setPhoneData(e.target.value)}
            icon={faPhone}
          />
        </div>

        <div className="info">
          <p>Password</p>
          <InputForm
            type='password'
            placeholder='******'
            value={passwordData}
            onChange={(e) => setPasswordData(e.target.value)}
            icon={faLock}
          />
        </div>

        <div className="validation">

        <Link className='submit-button' to='/profile' onClick={handleSubmit}>
          <ValidateButton
              text= 'Save'
          />
        </Link>

        </div>
      </div>

    </div>

    </div>
  )
}

export default UserEdit
