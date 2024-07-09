import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faPlus, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import '../../css/components/chat_group/layout.scss'
import ChannelCard from './channelCard';

function LayoutChat( {channels, messages} ) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isChannelOpen, setIsChannelOpen] = useState(true)
  const [channelOpen, setChannelOpen] = useState('')
  const [channelOpenId, setChannelOpenId] = useState('')

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const channelClickedName = (name) => {
    setChannelOpen(name)
  }

  const channelCLickedId = (id) => {
    setChannelOpenId(id)
  }

  console.log(messages)


  return (
    <div className='LayoutChat-container'>

      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : '' } `}>
        <FontAwesomeIcon onClick={() => setIsSidebarOpen(false)} className='close-icon' icon={faXmark} />

        { isChannelOpen ? (

        <>
          <div className="title-channel">
            <p>channels</p>
            <FontAwesomeIcon className='iconPlus' icon={faPlus} />
          </div>

            <div>
              {channels.map((channel => {
                return (<ChannelCard
                          key={channel._id}
                          title={channel.name}
                          id={channel._id}
                          closeSidebar={closeSidebar}
                          channelClickedName = {channelClickedName}
                          channelClickedId = {channelCLickedId}
                        />)
              }))}
            </div>
        </>
          )
          : null
        }

      </div>

      <div className="content">

        <div className='banner'>

          <FontAwesomeIcon onClick={() => setIsSidebarOpen(true)} className='burger-icon' icon={faBars} />

          <h1>{channelOpen.title}</h1>
        </div>
          { messages.map(message => {

           { if(channelOpenId === message.channel){
              return <li>{message.text}</li>
            } }
          })}
      </div>

    </div>
  )
}

export default LayoutChat
