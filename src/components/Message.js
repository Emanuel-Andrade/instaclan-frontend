import './Message.css'

import React from 'react'

const Message = (message) => {
  return (
    <div className={`message ${message.type} ` } >
        <h2>{message.msg}</h2>
    </div>
  )
}

export default Message