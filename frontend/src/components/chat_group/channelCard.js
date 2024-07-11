import React from 'react'
import '../../css/components/chat_group/channelCard.scss'

function ChannelsCard( {channel, id , toggleSidebar, channelClickedName, channelClickedId} ) {


  const handleCLick = () => {
    toggleSidebar()
    channelClickedName(channel)
    channelClickedId(id)
  }

  const wordsLetters = () => {
    const words = channel.name.split(" ")
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
      <div className='channel-title'>{channel.name}</div>
    </div>
  )
}

export default ChannelsCard
