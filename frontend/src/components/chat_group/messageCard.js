import React, {useEffect, useState} from 'react'
import '../../css/components/chat_group/messageCard.scss'

function MessageCard({text, userList, author}) {

  const [authorInfo, SetAuthorInfo] = useState(null)


  useEffect(() => {

    const foundAuthor = userList.find(user => user._id === author)
    SetAuthorInfo(foundAuthor)

  }, [userList, author])

  useEffect(() => {
    if (authorInfo){
      console.log(authorInfo.photo)
    }
  }, [authorInfo])




  return (
    <div className='message-card-container'>

      <div className="message-infos">

        <div className="author-avatar">
          <img
            src={authorInfo ? `http://localhost:5000${authorInfo.photo}` : 'loading'}
            alt='avatar'
          />
        </div>

        <div className="infos">
          {authorInfo ? authorInfo.pseudo : 'loading'}
        </div>
      </div>

      <div className="text">
        {text}
      </div>

    </div>
  )
}

export default MessageCard
