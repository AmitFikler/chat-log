import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const source = new EventSource('http://localhost:8080/users');
const ChatPage = ({ users, setUsers }) => {
  source.onmessage = function logEvent(event) {
    const data = JSON.parse(event.data);
    setUsers(data);
  };
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
      console.log(request.data);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   console.log('use effect');
  //   console.log(users);
  // });
  return (
    <div className="chat-page">
      <div className="chat">chat</div>
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
