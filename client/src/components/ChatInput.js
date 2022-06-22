import { useState } from "react"
import axios from "axios";
import {BACKEND} from "../globals";


const ChatInput = ({user, clickedRest, getUserMessages, getClickedRestMessages}) => {
  const [textArea, setTextArea] = useState('')
  const userId = user?.user_id
  const clickedRestId = clickedRest?.rest_id

  const addMessage = async () => {
    const message = {
      timestamp:  new Date().toISOString(),
      from_userId: userId,
      to_restId: clickedRestId,
      message: textArea
    }
    try {
      await axios.post(`${BACKEND}/message`, {message})
      getUserMessages()
      getClickedRestMessages()
      setTextArea("")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="chat-input">
      <textarea className='chat-textarea' value={textArea} onChange={(e) => setTextArea(e.target.value)} />
      <button className='secondary-button smaller' onClick={addMessage}>Submit</button>
    </div>
  )
}
export default ChatInput