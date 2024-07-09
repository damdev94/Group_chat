import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../functions/auth/authContext'
import '../css/components/topBar.scss'
import logo from '../images/auth-logo.svg'
import { Link } from 'react-router-dom';


function TopBar() {

  const { userInfos, logout } = useAuth()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [dropdownRef])

  return (
    <div>
       <div className='topBar-container'>
        <div className="logo">
          <img src={logo} alt='logo-dev' />
          <span>devchallenges</span>
        </div>
        <div className="avatar">
          <img
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            src={userInfos && (`http://localhost:5000${userInfos.photo}`)}
            alt="avatar-img"
          />
          {isDropdownOpen && (
            <div className='drop-menu' ref={dropdownRef}>
              <div className="link">
                <Link to='/profile'><p><FontAwesomeIcon icon={faUser} /> My profile</p></Link>
                <Link to='/chat'><p><FontAwesomeIcon icon={faUserGroup} /> Group chat</p></Link>
              </div>
              <div className='logout'>
                <p onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} />Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
