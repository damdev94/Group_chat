import React from 'react'
import '../../css/components/chat_group/channelCard.scss'

function ChannelsCard( {title, id , closeSidebar, channelClickedName, channelClickedId} ) {

  const handleCLick = () => {
    closeSidebar()
    channelClickedName({title})
    channelClickedId(id)
  }

  const wordsLetters = () => {
    const words = title.split(" ")
    let firstLetters = ""

    if(words.length === 1) {
      firstLetters += words[0][0]
    }else if(words.length > 1) {
      firstLetters += words[0][0] + words[1][0]
    }

    return firstLetters.toUpperCase()
  }

  return (
    <div className='channelCard-container' onClick={handleCLick}>
      <div className='channel-logo'>{wordsLetters()}</div>
      <div className='channel-title'>{title}</div>
    </div>
  )
}

export default ChannelsCard
