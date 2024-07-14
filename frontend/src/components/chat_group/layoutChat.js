import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/components/chat_group/layout.scss'
import { useAuth } from '../../functions/auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import DropdownUser from '../dropdownUser';
import ChannelCard from './channelCard';
import NewChannelForm from './newChannelForm';
import BottomSidebar from './bottomSidebar';
import MessageCard from './messageCard';


function LayoutChat({ channels, messages }) {
  const { token, userEmail } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [channelOpen, setChannelOpen] = useState('');
  const [channelOpenId, setChannelOpenId] = useState('');
  const [userList, setUserList] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDescription, setNewChannelDescription] = useState('');
  const [isNewChannelOpen, setIsNewChannelOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [channelList, setChannelList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formRef = useRef(null);
  const inputRef = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:5000/userinfos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setUserList(res.data);
        res.data.forEach(user => {
          if (user.email === userEmail)
            setCurrentUser(user);
        });
      })
      .catch(error => {
        console.log('Error fetching users infos', error);
      });
  }, [token, userEmail]);

  useEffect(() => {
    setChannelList(channels);
    setMessagesList(messages);
  }, [channels, messages]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNewChannelForm = () => {
    setIsNewChannelOpen(!isNewChannelOpen);
  };

  const channelClickedName = (name) => {
    setChannelOpen(name);
  };

  const channelClickedId = (id) => {
    setChannelOpenId(id);
  };

  const handleMessageData = (e) => {
    setNewMessage(e.target.value);
    e.target.scrollLeft = e.target.scrollWidth;
  };

  const handleNewChannelName = (e) => {
    setNewChannelName(e.target.value);
  };

  const handleNewChannelDescription = (e) => {
    setNewChannelDescription(e.target.value);
  };

  const handleCreateMessage = () => {

    const currentDate = new Date()

    const messageData = {
      text: newMessage,
      author: currentUser._id,
      channel: channelOpen._id,
      date: currentDate.toISOString(),
    };

    axios.post('http://localhost:5000/chat/message', messageData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log('Message Created');
        setNewMessage('');
        setMessagesList(prevlist => [...prevlist, messageData]);
      })
      .catch(error => {
        console.log(('Error creating message', error));
      });
  };

  const handleCreateChannel = () => {
    const channelData = {
      name: newChannelName,
      description: newChannelDescription
    };

    axios.post('http://localhost:5000/chat', channelData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log('Channel created');
        setNewChannelName('');
        setNewChannelDescription('');
        setChannelList(prevlist => [...prevlist, channelData]);
      })
      .catch(error => {
        console.log('Error creating channel', error);
      });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsNewChannelOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const parentComponentCss = { bottom: '55px', top: '-140px'};

  useEffect(() => {
    if (isNewChannelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNewChannelOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      handleCreateMessage()
    }
  }

  return (

    <div className='LayoutChat-container'>

      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <FontAwesomeIcon onClick={toggleSidebar} className='close-icon' icon={faXmark} />


          <>
            <div className="title-channel">
              <p>channels</p>
              <FontAwesomeIcon className='iconPlus' icon={faPlus} onClick={toggleNewChannelForm} />
            </div>

            <div className='channels'>
              {channelList.map((channel) => (
                <ChannelCard
                  key={channel._id}
                  channel={channel}
                  id={channel._id}
                  toggleSidebar={toggleSidebar}
                  channelClickedName={channelClickedName}
                  channelClickedId={channelClickedId}
                />
              ))}
            </div>

            <div className="footer-login" onClick={toggleUserMenu}>
              <BottomSidebar currentUser={currentUser} />
              {isDropdownOpen && (

                <DropdownUser css= {parentComponentCss} />

              )}
            </div>
          </>

      </div>

      <div className="content">
        <div className={`new-channel ${isNewChannelOpen ? 'new-channel-open' : ''}`} ref={formRef}>
          <NewChannelForm
            handleCreateChannel={handleCreateChannel}
            handleNewChannelName={handleNewChannelName}
            handleNewChannelDescription={handleNewChannelDescription}
            newChannelDescription={newChannelDescription}
            newChannelName={newChannelName}
            toggleNewChannelForm={toggleNewChannelForm}
          />
        </div>

        <div className='banner'>
          <FontAwesomeIcon onClick={() => setIsSidebarOpen(true)} className='burger-icon' icon={faBars} />
          <h1>{channelOpen.name}</h1>
        </div>

        <div className='messages'>

          {messagesList
            .filter((message) => message.channel === channelOpenId)
            .map((message) => {
              const author = userList.find((user) => user._id === message.author);

              return (
               <MessageCard
                key={message._id}
                author={author}
                message = {message}
               />
              );
            })}
        </div>

        <div className="margin-bottom-div"></div>

        <div className="new-message">
          <div className="input-new-message">
            <FontAwesomeIcon icon={faPlus} onClick={() => handleCreateMessage()} />
            <input
              type='text'
              placeholder='Type a message here'
              value={newMessage}
              onChange={(e) => handleMessageData(e)}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default LayoutChat;
