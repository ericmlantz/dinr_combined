import axios from "axios"
import Chat from "./Chat"
import ChatInput from "./ChatInput"
import {useState, useEffect} from "react"
import {BACKEND} from "../globals";

const ChatDisplay = ({user, clickedRest}) => {
  const userId = user?.user_id
  const clickedRestId = clickedRest?.rest_id
  const [userMessages, setUserMessages] = useState(null)
  const [clickedRestMessages, setClickedRestMessages] = useState(null)

  const getUserMessages = async () => {
    try {

      const response = await axios.get(`${BACKEND}/messages`, {
        params: {userId: userId, correspondingRestId: clickedRestId}
      })
      setUserMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClickedRestMessages = async () => {
    try {

      const response = await axios.get(`${BACKEND}/messages`, {
        params: {restId: clickedRestId, correspondingUserId: userId}
      })
      setClickedRestMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserMessages()
    getClickedRestMessages()
  }, [])

  const messages = []

  userMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.first_name
    formattedMessage['img'] = user?.profile_photo
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  clickedRestMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedRest?.rest_name
    formattedMessage['img'] = clickedRest?.rest_logo
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  const descendingOrderMessages = messages.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} user={user}/>
      <ChatInput user={user} clickedRest={clickedRest} getUserMessages={getUserMessages} getClickedRestMessages={getClickedRestMessages}/>
    </>
  )
}

export default ChatDisplay