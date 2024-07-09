import React from 'react'
import '../../css/components/auth/headerAuth.scss'
import logo from '../../images/auth-logo.svg'

function TopAuth({titleText}) {
  return (
    <div className='headerAuth'>
      <div className='logo'>
        <img src={logo} alt='logo-dev' />
        <span>devchallenges</span>
      </div>

      <div className="presentation-text">
        <p>Join thousands of learners from around the world</p>
      </div>

      <div className="title-page">
        <p>{titleText}</p>
      </div>
    </div>
  )
}

export default TopAuth
