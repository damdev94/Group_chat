import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/dropdownUser.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../functions/auth/authContext';


function DropdownUser({css}) {

  console.log(css)

  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  return (

    <div className='drop-menu' style={css} ref={dropdownRef}>
      <div className="link">
        <Link to='/profile'><p><FontAwesomeIcon icon={faUser} /> My profile</p></Link>
        <Link to='/chat'><p><FontAwesomeIcon icon={faUserGroup} /> Group chat</p></Link>
      </div>
      <div className='logout'>
        <p onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} />Logout</p>
      </div>
    </div>
  )
}

export default DropdownUser
