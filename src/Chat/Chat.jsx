import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get('https://tg-server-0ckm.onrender.com/chat');
        setChatMessages(response.data);
      } catch (error) {
        console.error('Ошибка при получении сообщений чата', error);
      }
    };

    fetchChatMessages();
  }, []);

  return (
    <div className="chat-container">
      {chatMessages.map((message, index) => (
        <div key={index} className={message.roleUser === 'User' ? 'User' : 'Operator'}>
          <div className="message-header">{message.idUser}</div>
          {message.textMessage}
        </div>
      ))}
    </div>
  );
};

export default Chat;