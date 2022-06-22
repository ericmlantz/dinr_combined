import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MatchesDisplay"
import ChatDisplay from "./ChatDisplay";
import {useState} from "react"

const ChatContainer = ({user}) => {
  const [clickedRest, setClickedRest] = useState(null)
  return (
    <div className='chat-container'>
      <ChatHeader user={user}/>

      <div>
        <button className='option' onClick={() => setClickedRest(null)}>Matches</button>
        <button className='option' disabled={!clickedRest}>Chat</button>
      </div>

      {!clickedRest && <MatchesDisplay matches={user.matches} setClickedRest={setClickedRest}/>}

      {clickedRest && <ChatDisplay user={user} clickedRest={clickedRest} />}

    </div>
  )
}
export default ChatContainer