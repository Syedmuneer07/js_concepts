import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';

function MessageList() {
    const [messages, setMessages] = React.useState({});

    // Fetch messages from the database when the component mounts 
    useEffect(() => {
        axios.get("https://mypager-8b8c2-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json")
        .then(response =>{
            console.log(response.data)
            let messageList = [];
            for(let messageId in response.data){
                messageList.push(response.data[messageId]);
            }
            messageList.reverse();
            let messageDisplay=messageList.slice(0,5)
            setMessages(messageDisplay);
        })
        .catch(error =>{
            console.error(error);
        })
    }, [])// empty dependency array means this effect will only run once when the component mounts

  return (
    <div className='message-container'>
        {messages.length > 0 && messages.map((message)=>{
            return (
                <div className='message-card'>
                    <div className='message-name'>{message.name}</div>
                    <div className='message-text'>{message.message}</div>
                </div>
            )
        })}
    </div>
  )
}

export default MessageList