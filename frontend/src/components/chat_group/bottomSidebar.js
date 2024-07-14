import React from 'react'
import '../../css/components/chat_group/bottomSidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

function BottomSidebar({currentUser}) {


  return (
    <>
      <div className='user-infos'>

        <div className="avatar">
          <img src={currentUser ? `http://localhost:5000${currentUser.photo}` : 'loading'}alt='user-avatar'/>
        </div>

        <div className="name">
          <p>{currentUser? currentUser.pseudo : 'loading'}</p>
        </div>

        </div>

        <div className='icon'>
        <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </>
  )
}

export default BottomSidebar
