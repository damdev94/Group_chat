import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../functions/auth/authContext';
import '../css/components/topBar.scss';
import logo from '../images/auth-logo.svg';
import DropdownUser from './dropdownUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function TopBar() {

  const { userInfos } = useAuth()

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
          <span style={{marginLeft : "10px"}}>Chat Group</span>
        </div>
        <div className="avatar" onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={dropdownRef}>
          <img
            src={userInfos && (`http://localhost:5000${userInfos.photo}`)}
            alt="avatar-img"
          />
          <FontAwesomeIcon icon={faCaretDown} />
          {isDropdownOpen && (
            <DropdownUser />
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
