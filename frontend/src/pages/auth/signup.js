import React, { useState } from 'react'
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import ValidateButton from '../../components/validateButton'
import '../../css/pages/auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SocialLinks from '../../components/auth/socialLinks'
import InputForm from '../../components/auth/inputForm'
import TopAuth from '../../components/auth/topAuth'

function SignUp() {

  const navigate = useNavigate()

  const [emailData, setEmailData] = useState('')
  const [passwordData, setPasswordData] = useState('')
  const [phoneData, setPhoneData] = useState('')
  const [pseudoData, setPseudoData] = useState('')

  const submitSignup = (e) => {
    e.preventDefault()

    const userData = {
      email: emailData,
      password: passwordData,
      phone: phoneData,
      pseudo : pseudoData
    };

    axios.post('http://localhost:5000/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log('User created !')
        navigate('/signin')
      })
      .catch(err => {
        console.error('Error creating user:', err)
      })
  }

  return (

  <div className='auth-page-container'>

    <div className='auth-container'>
      <TopAuth
        titleText='Create new account'
      />

      <div className="inputs">

        <InputForm
          type='email'
          placeholder='Email'
          value={emailData}
          onChange={(e) => setEmailData(e.target.value)}
          icon={faEnvelope}
        />

        <InputForm
          type='password'
          placeholder='Password'
          value={passwordData}
          onChange={(e) => setPasswordData(e.target.value)}
          icon={faLock}
        />

        <InputForm
          type='text'
          placeholder='Phone number'
          value={phoneData}
          onChange={(e) => setPhoneData(e.target.value)}
          icon={faPhone}
        />

        <InputForm
          type={'text'}
          placeholder={'Pseudo'}
          value={pseudoData}
          onChange={(e) => setPseudoData(e.target.value)}
          icon={faUser}
        />

        <div className="signin-link">
          Already have an account? &nbsp;
          <Link to='/signin'>Sign in</Link>
        </div>

      </div>

      <Link className="validation" to= '/signup' onClick={submitSignup}>
        <ValidateButton text='Create'/>
      </Link>

      <SocialLinks />

    </div>

  </div>
  )
}

export default SignUp
