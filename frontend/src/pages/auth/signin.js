import React, { useState } from 'react'
import '../../css/pages/auth.scss'
import { useAuth } from '../../functions/auth/authContext'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import ValidateButton from '../../components/validateButton'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SocialLinks from '../../components/auth/socialLinks'
import InputForm from '../../components/auth/inputForm'
import TopAuth from '../../components/auth/topAuth'


function SignIn() {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [emailData, setEmailData] = useState('')
  const [passwordData, setPasswordData] = useState('')
  const [loginError, setLoginError] = useState(false)

  const submitSignup = (e) => {
    e.preventDefault()

    const userData = {
      email: emailData,
      password: passwordData,
    };

    axios.post('http://localhost:5000/signin', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log('User connected !')
        login(res.data.token, emailData)
        navigate('/profile')
      })
      .catch(err => {
        setLoginError(true)
        console.error('Error creating user:', err)
      })
  }

  return (
    <div className='auth-page-container'>
      <div className='auth-container'>
        <TopAuth
          titleText='Log In'
        />

      <div className="inputs">

        {loginError && (
          <div className="error-login-message">
            <p>Your Email or your password is incorrect, try again</p>
          </div>
        )}

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

          <div className="signup-link">
            Not account yet ? &nbsp;
            <Link to='/signup'>Create an account</Link>
          </div>

      </div>

      <Link className="validation" to= '/signin' onClick={submitSignup}>
        <ValidateButton text='Connexion'/>
      </Link>

        <SocialLinks />

      </div>
    </div>
  )
}

export default SignIn
