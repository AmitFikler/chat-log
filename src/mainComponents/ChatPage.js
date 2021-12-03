import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const ChatPage = ({ users, setUsers }) => {
  useEffect(() => {
    let eventSourceUsers = new EventSource(
      `http://localhost:8080/users?username=${sessionStorage.getItem(
        'username'
      )}`
    );
    let eventSourceMessage = new EventSource(`http://localhost:8080/message`);
    eventSourceUsers.onmessage = (e) => {
      console.log(e.data);
      setUsers((prevUsers) => {
        const users = JSON.parse(e.data);
        return users.length ? users : [...prevUsers, users.username];
      });
    };
    eventSourceMessage.onmessage = (e) => {
      setMessages((prevMessages) => {
        const messages = JSON.parse(e.data);
        return messages.length ? messages : [...prevMessages, messages];
      });
    };
  }, []);

  const updateUsersList = (user) => {
    setUsers(user);
  };
  // const updateMessagesList = (mmsg) => {
  //   setMessages((prevMessages) => {
  //     return messages.length ? mmsg : [...prevMessages, mmsg];
  //   });
  //   console.log(messages);
  //   console.log(mmsg);
  // };

  const [messages, setMessages] = useState([]);
  const textareaEl = useRef(null);
  async function sendMessage() {
    try {
      const textareaValue = textareaEl.current.value;
      const request = await axios.put(
        'http://localhost:8080/message/new-message',
        {
          username: sessionStorage.getItem('username'),
          color: sessionStorage.getItem('color'),
          message: textareaValue,
        }
      );
      textareaEl.current.value = '';
      console.log(request.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="chat-page">
      <div className="chat">
        <ul>
          {messages.map((msg) => {
            return <li style={{ color: msg.color }}>{msg.message}</li>;
          })}
        </ul>
      </div>
      <div className="contact-list">
        <h2 style={{ borderBottom: '2px solid', padding: '20px' }}>
          contact list
        </h2>
        <ul>
          {users.map((user) => {
            return <li>{user}</li>;
          })}
        </ul>
      </div>
      <div className="input-message">
        <textarea
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
              return;
            } else {
              return;
            }
          }}
          ref={textareaEl}
          className="textarea-message"
          name="message"
          cols="30"
          rows="2"
        ></textarea>
        <button onClick={() => sendMessage()}>
          {' '}
          <i className="fas fa-paper-plane"></i> send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
