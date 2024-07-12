import React, {useState, useEffect} from 'react'
import LayoutChat from '../components/chat_group/layoutChat'
import axios from 'axios'
import { useAuth } from '../functions/auth/authContext'


function Chat() {

  const { token } = useAuth()

  const [ channels, setChannels ] = useState([])

  const [ messages, setMessages ] = useState([])

  useEffect(() => {

    axios.get('http://localhost:5000/chat', {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
      .then(res => {
        setChannels(res.data)
      })
      .catch (error => {
        console.error('Error fetching channels', error)
      })

  }, [token])

  useEffect(() => {

    axios.get('http://localhost:5000/chat/message', {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
      .then(res => {
        setMessages(res.data)
      })
      .catch (error => {
        console.error('Error fetching messages', error)
      })

  }, [token])

  return (
    <div>
    {console.log('chat')}
      <LayoutChat channels={channels} messages={messages} />
    </div>
  )
}

export default Chat
