const Chat = ({descendingOrderMessages, user}) => {
  return (
    <div className='chat-display'>
      {descendingOrderMessages.map((message, _index) => (
        <div className={message.name===user.first_name ? 'blue message-card' : 'green message-card'} key={_index}>
          <div className='chat-message-header'>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  )
}
export default Chat