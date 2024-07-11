import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '../../functions/auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../css/components/chat_group/layout.scss'
import ChannelCard from './channelCard';
import MessageCard from './messageCard';
import NewChannelForm from './newChannelForm';

function LayoutChat( {channels, messages} ) {

  const {token, user} = useAuth()


  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isChannelOpen, setIsChannelOpen] = useState(true)
  const [channelOpen, setChannelOpen] = useState('')
  const [channelOpenId, setChannelOpenId] = useState('')
  const [userList, SetUserList] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [newChannelName, setNewChannelName] = useState('')
  const [newChannelDecription, setNewChannelDescription] = useState('')
  const [isNewChannelOpen, setIsNewChannelOpen] = useState(false)

   const formRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleNewChannelForm = () => {
    setIsNewChannelOpen(!isNewChannelOpen)
  }

  const channelClickedName = (name) => {
    setChannelOpen(name)
  }

  const channelCLickedId = (id) => {
    setChannelOpenId(id)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/userinfos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        SetUserList(res.data)
      })
      .catch(error => {
        console.log('Error fetching users infos', error)
      })

  }, [token])

  const handleMessageData = (e) => {
    setNewMessage(e.target.value)
    e.target.scrollLeft = e.target.scrollWidth
  }

  const handleNewChannelName = (e) => {
    setNewChannelName(e.target.value)
  }

  const handleNewChannelDescription = (e) => {
    setNewChannelDescription(e.target.value)
  }

  const handleCreateMessage = () => {

    const currentUser = user

    const messageData = {
      text : newMessage,
      author : currentUser._id,
      channel : channelOpen._id
    }

    axios.post('http://localhost:5000/chat/message', messageData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('Message Created')
      setNewMessage('')
    })
    .catch(error => {
      console.log(('Error creating message', error))
    })
  }

  const handleCreateChannel = () => {

    const channelData = {
      name : newChannelName,
      description : newChannelDecription
    }

    axios.post('http://localhost:5000/chat', channelData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('Channel created')
      setNewChannelName('')
      setNewChannelDescription('')
    })
    .catch(error => {
      console.log('Errror creating channel', error)
    })
  }

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsNewChannelOpen(false)
    }
  }

  useEffect(() => {
    if (isNewChannelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isNewChannelOpen])

  return (
    <div className='LayoutChat-container'>

      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : '' } `}>
        <FontAwesomeIcon onClick={toggleSidebar} className='close-icon' icon={faXmark} />

        { isChannelOpen ? (

        <>
          <div className="title-channel">
            <p>channels</p>
            <FontAwesomeIcon className='iconPlus' icon={faPlus} onClick={toggleNewChannelForm} />
          </div>

            <div className='channels'>
              {channels.map((channel => {
                return (<ChannelCard
                          key={channel._id}
                          channel={channel}
                          id={channel._id}
                          toggleSidebar={toggleSidebar}
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

        <div className={`new-channel ${isNewChannelOpen ? 'new-channel-open' : ''}`} ref={formRef}>
          <NewChannelForm
            handleCreateChannel={handleCreateChannel}
            handleNewChannelName={handleNewChannelName}
            handleNewChannelDescription={handleNewChannelDescription}
            newChannelDecription={newChannelDecription}
            newChannelName={newChannelName}
            toggleNewChannelForm = {toggleNewChannelForm}
          />
        </div>

        <div className='banner'>

          <FontAwesomeIcon onClick={() => setIsSidebarOpen(true)} className='burger-icon' icon={faBars} />

          <h1>{channelOpen.name}</h1>
        </div>

          <div className="messages">

            { messages.filter(message => channelOpenId === message.channel).map(message => (
              <MessageCard
                key={message._id}
                text={message.text}
                author={message.author}
                userList={ userList }
              />
            ))}

          </div>

          <div className="margin-bottom-div">

          </div>

          <div className="new-message">
            <div className="input-new-message">
              <FontAwesomeIcon icon={faPlus} onClick={() => handleCreateMessage()}/>
              <input type='text' placeholder='Type a message here' value={newMessage} onChange={(e) => handleMessageData(e)}/>
            </div>
          </div>

      </div>

    </div>
  )
}

export default LayoutChat
