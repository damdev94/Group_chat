import React from 'react'
import '../../css/components/chat_group/messageCard.scss'

function MessageCard({author, message}) {

  const messageDate = () => {

    const messageDateFormated = message.date.substring(0,10)
    const messageHourFormated = message.date.substring(11,16)

    /* const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
    const day = String(today.getDate()).padStart(2, '0'); // Jour de 1 à 31

    const formattedDate = `${year}-${month}-${day}`; */

    return `${messageDateFormated}  At  ${messageHourFormated}`

  }


  return (
    <div key={message._id} className='message-card-container'>
      <div className='message-infos'>
        <div className='author-avatar'>
          <img src={`http://localhost:5000${author.photo}`} alt='avatar' />
        </div>
        <div className='infos'>

          <div className="author-pseudo">
            {author.pseudo}
          </div>

          <div className="message-date">
            {messageDate()}
          </div>

        </div>
      </div>
      <div className='text'>{message.text}</div>
    </div>
  )
}

export default MessageCard
